import { inject, injectable } from "inversify";
import { IPartialRecipeWithId, IRecipe } from "../recipe.interface";
import { RecipeService } from "../recipes.service";
import { Document } from "mongoose";

@injectable()
export class UpdateRecipeProvider {
    constructor(@inject(RecipeService) private recipeService: RecipeService) {}

    public async updateRecipe(
        updatedRecipe: IPartialRecipeWithId
    ): Promise<Document | never> {
        const recipe: (Document & IRecipe) | null = await this.recipeService.findById(updatedRecipe._id);

        if (!recipe) {
            throw new Error("Recipe not found");
            //res.status(404).json({ message: "Recipe not found" });
        }

        recipe.name = updatedRecipe.name? updatedRecipe.name : recipe.name;
        recipe.ingredients = updatedRecipe.ingredients? updatedRecipe.ingredients : recipe.ingredients;
        recipe.category = updatedRecipe.category? updatedRecipe.category : recipe.category;
        recipe.meal = updatedRecipe.meal? updatedRecipe.meal : recipe.meal;
        recipe.preparationTime = updatedRecipe.preparationTime? updatedRecipe.preparationTime : recipe.preparationTime;
        
        return await recipe.save();
    }

};