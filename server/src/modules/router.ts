import { Router } from "express";
import { productRouter } from "./products/product.router";

export const appRouter = Router();

appRouter.use(productRouter);
