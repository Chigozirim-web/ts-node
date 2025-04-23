import { Router, Request, Response } from "express";
import { RecipesController } from "./recipes.controller";
import { injectable, inject } from "inversify";
import { IPartialRecipeWithId, IRecipe } from "./recipe.interface";
import { createRecipeValidator } from "./validators/createRecipe.validator";
import { validationResult } from "express-validator";
import { getRecipesValidator } from "./validators/getRecipes.validator";
import { updateRecipeValidator } from "./validators/updateRecipe.validator";
import { StatusCodes } from "http-status-codes";

@injectable()
export class RecipesRouter {
    public router: Router;

    constructor(@inject(RecipesController) private recipesController: RecipesController) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.get(
            "/", 
            getRecipesValidator,
            async (req: Request, res: Response) => {
                const result = validationResult(req);
                if(result.isEmpty()) {
                    const allRecipes = await this.recipesController.handleGetRecipes(req, res);
                    res.status(StatusCodes.OK).json(allRecipes);
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json({ errors: result.array() });
                }
                
            }
        );

        this.router.post(
            "/add", 
            createRecipeValidator,
            async (req: Request<{}, {}, IRecipe>, res: Response) => {
                const result = validationResult(req);

                if (result.isEmpty()) {
                    const newRecipe = await this.recipesController.handlePostRecipes(req, res);
                    res.status(StatusCodes.CREATED).json(newRecipe);
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json({ errors: result.array() });
                }
            }
        );

        this.router.patch(
            "/update",
            updateRecipeValidator, 
            async (req: Request<{}, {}, IPartialRecipeWithId>, res: Response) => {
                const result = validationResult(req);

                // Check if there are validation errors
                if (result.isEmpty()) {
                    const updatedRecipe = await this.recipesController.handleUpdateRecipe(req, res);
                    res.status(StatusCodes.OK).json(updatedRecipe);
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json({ errors: result.array() });
                }
        });
    };
}