from rest_framework import routers
from api.viewsets import CategoryViewSet, RecipeViewSet, IngredientViewSet, InstructionViewSet, \
    PublicRecipeViewSet, RecipeCategoryViewSet

api_router = routers.DefaultRouter()
api_router.register(r'categories', CategoryViewSet)
api_router.register(r'recipes', RecipeViewSet)
api_router.register(r'recipe_categories', RecipeCategoryViewSet)
api_router.register(r'public_recipes', PublicRecipeViewSet)
api_router.register(r'ingredients', IngredientViewSet)
api_router.register(r'instructions', InstructionViewSet)

