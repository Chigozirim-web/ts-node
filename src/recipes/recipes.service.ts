import { injectable } from "inversify";
import { Recipe } from "./recipe.schema";
import { Model, FilterQuery } from "mongoose";
import { IRecipe } from "./recipe.interface";
import { IRecipePagination } from "./interfaces/recipePagination.interface";
@injectable()
export class RecipeService {
    private recipeModel: Model<IRecipe> = Recipe;

    public async createRecipe(recipeData: IRecipe){
        const recipe = new this.recipeModel(recipeData);
        return await recipe.save();
    }

    public async findById(_id: string) {
        return await this.recipeModel.findById(_id) //.exec();
    }

    public async findAll(pagination: IRecipePagination) {
        return await this.recipeModel
        .find()
        .limit(pagination.limit)
        .skip(pagination.page -1)
        .sort({
            createdAt: pagination.order === "asc" ? 1 : -1
        }); 
    }

    public async countDocuments(filter?: FilterQuery<IRecipe>) {
        return await this.recipeModel.countDocuments(filter);
    }

    /*public async findActive(pagination: IRecipePagination) {
        return await this.recipeModel
        .find({
            status: { $in: ["2"]}
        })
        .limit(pagination.limit)
        .skip(pagination.page -1)
        .sort({
            createdAt: pagination.order === "asc" ? 1 : -1
        }); //.exec();
    } */

}

/**
 * 
 *
{
  "name": "Grilled Cheese Sandwich",
  "ingredients": [
    "bread",
    "cheese",
    "butter"
  ],
  "category": [
    "Snack"
  ],
  "meal": [
    "Vegetarian"
  ],
  "preparationTime": 10
},
{
  "name": "Beef Tacos",
  "ingredients": [
    "ground beef",
    "taco shells",
    "lettuce",
    "cheese",
    "salsa"
  ],
  "category": [
    "Main Course"
  ],
  "meal": [
    "Non-Vegetarian"
  ],
  "preparationTime": 25
},
{
  "name": "Tomato Soup",
  "ingredients": [
    "tomatoes",
    "onion",
    "garlic",
    "vegetable broth",
    "cream"
  ],
  "category": [
    "Soup"
  ],
  "meal": [
    "Vegetarian"
  ],
  "preparationTime": 30
},
{
  "name": "Avocado Toast",
  "ingredients": [
    "bread",
    "avocado",
    "salt",
    "pepper",
    "lemon juice"
  ],
  "category": [
    "Breakfast"
  ],
  "meal": [
    "Vegetarian",
    "Vegan"
  ],
  "preparationTime": 10
},
{
  "name": "Chicken Alfredo Pasta",
  "ingredients": [
    "pasta",
    "chicken",
    "cream",
    "parmesan cheese",
    "garlic"
  ],
  "category": [
    "Pasta"
  ],
  "meal": [
    "Non-Vegetarian"
  ],
  "preparationTime": 35
},
{
  "name": "Greek Salad",
  "ingredients": [
    "cucumber",
    "tomatoes",
    "feta cheese",
    "olives",
    "olive oil"
  ],
  "category": [
    "Salad"
  ],
  "meal": [
    "Vegetarian"
  ],
  "preparationTime": 15
},
{
  "name": "BBQ Chicken Pizza",
  "ingredients": [
    "pizza dough",
    "chicken",
    "BBQ sauce",
    "cheese",
    "onion"
  ],
  "category": [
    "Main Course"
  ],
  "meal": [
    "Non-Vegetarian"
  ],
  "preparationTime": 40
},
{
  "name": "Lentil Curry",
  "ingredients": [
    "lentils",
    "coconut milk",
    "curry powder",
    "onion",
    "garlic"
  ],
  "category": [
    "Main Course"
  ],
  "meal": [
    "Vegetarian",
    "Vegan"
  ],
  "preparationTime": 30
},
{
  "name": "Chocolate Chip Cookies",
  "ingredients": [
    "flour",
    "sugar",
    "butter",
    "chocolate chips",
    "eggs"
  ],
  "category": [
    "Dessert"
  ],
  "meal": [
    "Vegetarian"
  ],
  "preparationTime": 25
},
 */