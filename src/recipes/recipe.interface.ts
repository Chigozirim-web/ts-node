import { RecipeCategory } from "./interfaces/recipeCategory";
import { RecipeMeal } from "./interfaces/recipeMeal";

export interface IRecipe {
    name: string;
    ingredients: string[];
    category: RecipeCategory[];
    meal: RecipeMeal[];
    preparationTime: number;
};

export interface IPartialRecipeWithId extends Partial<IRecipe> {
    _id: string;
}