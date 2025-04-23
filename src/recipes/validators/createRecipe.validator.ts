import { checkSchema } from "express-validator";

export const createRecipeValidator = checkSchema({
    name: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Name is required",
        isString: true,
        trim: true,
    },
    ingredients: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Ingredients are required",
        isArray: true,
    },
    category: {
        in: ["body"],
        notEmpty: true,
        isIn: {
            options: [
                ["Appetizer", "Main Course", "Dessert", "Salad", "Soup", "Side Dish", "Rice Dish", "Snack", "Breakfast", "Lunch", "Dinner"],
            ]
        },
        errorMessage: "Category is required",
        isArray: true,
    },
    meal: {
        in: ["body"],
        notEmpty: true,
        isIn: {
            options: [
                ["Vegetarian", "Vegan", "Pescatarian", "Omnivore"],
            ]
        },
        errorMessage: "Meal is required",
        isArray: true,
        trim: true,
    },
    preparationTime: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Preparation time is required",
        isInt: true,
    },
});