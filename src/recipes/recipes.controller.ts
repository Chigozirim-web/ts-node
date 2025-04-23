import { injectable, inject } from "inversify";
import { UserController } from "../user/user.controller";
import { IRecipe, IPartialRecipeWithId } from "./recipe.interface";
import { Request, Response } from "express";
import { Document } from "mongoose";
import { UpdateRecipeProvider } from "./providers/updateRecipe.provider";
import { GetRecipesProvider } from "./providers/getRecipes.provider";
import { RecipeService } from "./recipes.service";
import { matchedData } from "express-validator";

import { RecipeCategory } from "./interfaces/recipeCategory"; 
import { RecipeMeal } from "./interfaces/recipeMeal";
import { IRecipePagination } from "./interfaces/recipePagination.interface";

@injectable()
export class RecipesController {
  constructor(
    @inject(UserController) private userController: UserController,
    @inject(RecipeService) private recipeService: RecipeService,
    @inject(UpdateRecipeProvider) private updateRecipeProvider: UpdateRecipeProvider,
    @inject(GetRecipesProvider) private getRecipesProvider: GetRecipesProvider
  ) {}


  public async handleGetRecipes(req: Request, res: Response) {

    const validatedData: Partial<IRecipePagination> = matchedData(req);

    try{
      const recipes: { data: IRecipe[], meta: {} } = await this.getRecipesProvider.findAllRecipes(validatedData);
      return recipes;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async handlePostRecipes(req: Request<{}, {}, IRecipe>, res: Response) {
    const validatedData: IRecipe = matchedData(req);

    try {
      return await this.recipeService.createRecipe(validatedData);
      //await recipe.save()
    } catch(error: any) {
      throw new Error(error);
    }
  };

  public async handleUpdateRecipe(
    req: Request<{}, {}, IPartialRecipeWithId>, 
    res: Response
  ): Promise<Document> {
    const validatedData: IPartialRecipeWithId = matchedData(req);

    try {
      return await this.updateRecipeProvider.updateRecipe(validatedData);
    } catch (error: any) {
      throw new Error(error);
    }
  };
}


//mongodb 
//user: nodejs
//password: ePQiohPBRiHrqHMe