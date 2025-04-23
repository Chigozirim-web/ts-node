import { injectable, inject } from "inversify";
import { RecipeService } from "../recipes.service";
import { IRecipePagination } from "../interfaces/recipePagination.interface";
import { IRecipe } from "../recipe.interface";

@injectable()
export class GetRecipesProvider {
    constructor(@inject(RecipeService) private recipeService: RecipeService) {}

    public async findAllRecipes(pagination: Partial<IRecipePagination>    
    ): Promise<{ data: IRecipe[]; meta: {} }> {
        const recipes: IRecipe[] = await this.recipeService.findAll({
            limit: pagination.limit ?? 10,
            page: pagination.page ?? 1,
            order: pagination.order ?? "asc"
        });

        const totalRecipes = await this.recipeService.countDocuments();
        //Others for e.g:
        const quickMeals = await this.recipeService.countDocuments({ preparationTime: { $lt: 15 } });

        return {
            data: recipes,
            meta: { total: totalRecipes, quickMeals },
        }
    }
}