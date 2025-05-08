import { Router } from "express";
import { IsAdminMiddleware } from "../../core/middlewares/isAdmin.middleware";
import { TokenExistsMiddleware } from "../../core/middlewares/tokenExists.middleware";
import { CategoryRoutes } from "./categories/routes/category.routes";
import { BrandRoutes } from "./brands/routes/brand.routes";
export class DashboardRoutes {
    public readonly router: Router;

    constructor() {
        this.router = Router();

        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use(
            "/categories",
            TokenExistsMiddleware.check,
            IsAdminMiddleware.check,
            new CategoryRoutes().router
        );

        this.router.use(
            "/brands",
            TokenExistsMiddleware.check,
            IsAdminMiddleware.check,
            new BrandRoutes().router
        );
    }
}
