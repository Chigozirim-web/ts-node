import { checkSchema } from "express-validator";

export const updateRecipeValidator = checkSchema({
    _id: {
        in: ["body"],
        notEmpty: true,
        errorMessage: "Valid document ID is required",
        isString: true,
        isMongoId: true,
    },
    name: {
        in: ["body"],
        optional: true,
        errorMessage: "Name is required",
        isString: true,
        trim: true,
    },
    ingredients: {
        in: ["body"],
        optional: true,
        errorMessage: "Ingredients are required",
        isArray: true,
    },
    category: {
        in: ["body"],
        optional: true,
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
        optional: true,
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
        optional: true,
        errorMessage: "Preparation time is required",
        isInt: true,
    },
});