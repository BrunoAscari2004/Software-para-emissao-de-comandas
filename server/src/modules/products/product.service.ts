import { Product } from "./Product";
import * as ProductRepository from "./product.repository";

export const saveProduct = async (product: Product) => {
    return await ProductRepository.saveProduct(product);
};
