import { Schema, Model, model } from "mongoose";
import { IRecipe } from "./recipe.interface";
import { RecipeCategory } from "./interfaces/recipeCategory";
import { RecipeMeal } from "./interfaces/recipeMeal";

const recipeSchema: Schema<IRecipe> = new Schema(
    {
        name: { 
            type: String, 
            required: [true, "Recipe name is required"],
            trim: true
        },
        ingredients: { 
            type: [String], 
            required: true 
        },
        category: { 
            type: [String], 
            enum: Object.values(RecipeCategory), 
            required: true 
        },
        meal: { 
            type: [String], 
            enum: Object.values(RecipeMeal), 
            required: true 
        },
        preparationTime: { 
            type: Number, 
            required: true 
        },
    }, 
    {
        timestamps: true,
    }
);

export const Recipe: Model<IRecipe> = model("Recipe", recipeSchema);