import { Application } from "express";
import { container } from "./container";
import { RecipesRouter } from "../recipes/recipes.router";

export function addRoutes(app: Application): Application {

    const recipesRouter = container.get<RecipesRouter>(RecipesRouter);
    app.use("/recipes", recipesRouter.router);

    return app;
}