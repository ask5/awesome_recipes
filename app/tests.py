from django.test import TestCase
from api.models import Recipe, Category, Ingredient, Instruction
from django.contrib.auth.models import User


class RecipeTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(username='test_user',
                                        email='test@something.com',
                                        password='test password')
        Recipe.objects.create(name="test recipe", serving_size=1, public=True, created_by=user)
        Category.objects.create(name="breakfast")
        Category.objects.create(name="soup")

    def test_recipe_is_public(self):
        recipe = Recipe.objects.get(name="test recipe")
        self.assertEqual(recipe.is_public(), 'public')

    def test_recipe_has_serving_size_1(self):
        recipe = Recipe.objects.get(name="test recipe")
        self.assertEqual(recipe.serving_size, 1)

    def test_add_categories_to_recipe(self):
        recipe = Recipe.objects.get(name="test recipe")
        breakfast = Category.objects.get(name="breakfast")
        recipe.categories.add(breakfast)
        soup = Category.objects.get(name="soup")
        recipe.categories.add(soup)

        recipe.save()
        self.assertEqual(len(recipe.categories.all()), 2)

    def test_add_ingredients_to_recipe(self):
        recipe = Recipe.objects.get(name="test recipe")
        ing = {'text': 'ingredient1'}
        recipe.ingredients.create(recipe=recipe, **ing)
        self.assertEqual(len(Ingredient.objects.filter(recipe=recipe, text="ingredient1").all()), 1)

    def test_add_instructions_to_recipe(self):
        recipe = Recipe.objects.get(name="test recipe")
        ing = {'text': 'instruction1'}
        recipe.instructions.create(recipe=recipe, **ing)
        self.assertEqual(len(Instruction.objects.filter(recipe=recipe, text="instruction1").all()), 1)
