from rest_framework import viewsets
from api.models import *
from api.serializers import CategorySerializer, RecipeSerializer, IngredientSerializer, InstructionSerializer, \
    PublicRecipeSerializer, RecipeCategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def get_queryset(self):
        user = self.request.user
        if not user.is_anonymous:
            return Recipe.objects.filter(created_by__id=user.id)

        return Recipe.objects.none()


class PublicRecipeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Recipe.objects.filter(public=True).order_by('-date_modified')
    serializer_class = PublicRecipeSerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class InstructionViewSet(viewsets.ModelViewSet):
    queryset = Instruction.objects.all()
    serializer_class = InstructionSerializer


class RecipeCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeCategorySerializer

