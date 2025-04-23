import {  Container } from "inversify"
import { RecipesController } from "../recipes/recipes.controller";
import { RecipesRouter } from "../recipes/recipes.router";
import { UserController } from "../user/user.controller";
import { RecipeService } from "../recipes/recipes.service";
import { UpdateRecipeProvider } from "../recipes/providers/updateRecipe.provider";
import { GetRecipesProvider } from "../recipes/providers/getRecipes.provider";

export const container: Container = new Container();

container.bind<RecipesController>(RecipesController).toSelf().inTransientScope();
container.bind<RecipesRouter>(RecipesRouter).toSelf().inTransientScope();
container.bind<UserController>(UserController).toSelf().inTransientScope();
container.bind<RecipeService>(RecipeService).toSelf().inTransientScope();
container.bind<UpdateRecipeProvider>(UpdateRecipeProvider).toSelf().inTransientScope();
container.bind<GetRecipesProvider>(GetRecipesProvider).toSelf().inTransientScope();
