import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { VerifyIdMiddleware } from "../../../../core/middlewares/verifyId.middleware";

export class CategoryRoutes {
    public readonly router: Router;

    private readonly controller: CategoryController;

    constructor() {
        this.router = Router();

        this.controller = new CategoryController();

        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        const { getAll, getById,getBySlug, createNew, updateById, deleteById } =
            this.controller;

        this.router.get("/", getAll.bind(this.controller));

        this.router.get(
            "/slug/:slug",
            getBySlug.bind(this.controller)
        );

        this.router.get(
            "/:id",
            VerifyIdMiddleware.validate,
            getById.bind(this.controller)
        );

        this.router.post("/", createNew.bind(this.controller));

        this.router.patch(
            "/:id",
            VerifyIdMiddleware.validate,
            updateById.bind(this.controller)
        );

        this.router.delete(
            "/:id",
            VerifyIdMiddleware.validate,
            deleteById.bind(this.controller)
        );
    }
}
