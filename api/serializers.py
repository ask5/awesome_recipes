from rest_framework import serializers
from api.models import *


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'text']


class InstructionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instruction
        fields = ['id', 'text']


class RecipeSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(many=True, queryset=Category.objects.all())
    instructions = InstructionSerializer(many=True, allow_null=True, required=False)
    ingredients = IngredientSerializer(many=True, allow_null=True, required=False)

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'notes', 'serving_size', 'public', 'categories', 'ingredients', 'instructions',
                  'date_added', 'date_modified']

    def create(self, validated_data):
        categories_data = validated_data.pop('categories', [])
        ingredients_data = validated_data.pop('ingredients', [])
        instructions_data = validated_data.pop('instructions', [])
        validated_data["created_by"] = self.context["request"].user
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_data:
            Ingredient.objects.create(recipe=recipe, **ingredient_data)
        for instruction_data in instructions_data:
            Instruction.objects.create(recipe=recipe, **instruction_data)
        for category in categories_data:
            recipe.categories.add(category.id)
        return recipe

    def update(self, instance, validated_data):
        categories_data = validated_data.pop('categories', [])
        ingredients_data = validated_data.pop('ingredients', [])
        instructions_data = validated_data.pop('instructions', [])
        instance.name = validated_data.get('name', instance.name)
        instance.notes = validated_data.get('notes', instance.notes)
        instance.serving_size = validated_data.get('serving_size', instance.serving_size)
        instance.public = validated_data.get('public', instance.public)

        Ingredient.objects.filter(recipe=instance).delete()
        Instruction.objects.filter(recipe=instance).delete()
        for ingredient_data in ingredients_data:
            Ingredient.objects.update_or_create(recipe=instance, **ingredient_data)
        for instruction_data in instructions_data:
            Instruction.objects.update_or_create(recipe=instance, **instruction_data)

        for category in categories_data:
            instance.categories.add(category)

        instance.save()

        return instance


class PublicRecipeSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)
    instructions = InstructionSerializer(many=True, allow_null=True, required=False)
    ingredients = IngredientSerializer(many=True, allow_null=True, required=False)

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'notes', 'serving_size', 'public', 'categories', 'ingredients', 'instructions',
                  'date_added', 'date_modified']


class RecipeCategorySerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)

    class Meta:
        model = Recipe
        fields = ['id', 'categories']
