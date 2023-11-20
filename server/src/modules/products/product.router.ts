import { Router } from "express";
import * as ProductService from "./product.service";

export const productRouter = Router();

productRouter.get("/", (req, res) => {
    return res.status(200).json({ haha: "kabum" });
});

// curl -X POST http://localhost:3333 -H "Content-Type: application/json" -d '{"name": "teste", "qtd": 2}'
productRouter.post("/", async (req, res) => {
    console.log("req.body: ", req.body);
    const { name, qtd } = req.body;

    const product = await ProductService.saveProduct({
        id: "aaaaaaaaa" + new Date().getTime(),
        name,
        qtd,
    });
    return res.status(200).json({ haha: "kabum", product });
});
