import { Router } from "express";
import { VerifyIdMiddleware } from "../../../../core/middlewares/verifyId.middleware";
import { ProductController } from "../controllers/product.controller";
import { uploadProductImage } from "../../../../core/middlewares";

export class ProductRoutes {
    public readonly router: Router;

    private readonly controller: ProductController;

    constructor() {
        this.router = Router();

        this.controller = new ProductController();

        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        const { getAll, getById,createNew, updateById, deleteById } =this.controller;

        this.router.get("/", getAll.bind(this.controller));

        this.router.get("/:id",VerifyIdMiddleware.validate,getById.bind(this.controller));

        this.router.post("/", uploadProductImage.array('images'), createNew.bind(this.controller));

        this.router.patch("/:id",VerifyIdMiddleware.validate,uploadProductImage.array('images'),updateById.bind(this.controller));

        this.router.delete("/:id",VerifyIdMiddleware.validate,deleteById.bind(this.controller));
    }
}
