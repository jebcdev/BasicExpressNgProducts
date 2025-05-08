import { Router } from "express";
import { BrandController } from "../controllers/brand.controller";
import { VerifyIdMiddleware } from "../../../../core/middlewares/verifyId.middleware";
import { uploadBrandImage } from "../../../../core/middlewares/uploadBrandImage.middleware";

export class BrandRoutes {
    public readonly router: Router;

    private readonly controller: BrandController;

    constructor() {
        this.router = Router();

        this.controller = new BrandController();

        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        const {
            getAll,
            getById,
            getBySlug,
            createNew,
            updateById,
            deleteById,
        } = this.controller;

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

        this.router.post(
            "/",
            uploadBrandImage.single("image"),
            createNew.bind(this.controller)
        );

        this.router.patch(
            "/:id",
            VerifyIdMiddleware.validate,
            uploadBrandImage.single("image"),
            updateById.bind(this.controller)
        );

        this.router.delete(
            "/:id",
            VerifyIdMiddleware.validate,
            deleteById.bind(this.controller)
        );
    }
}
