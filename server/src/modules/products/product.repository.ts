import { Product } from "./Product";

export const saveProduct = async (product: Product) => {
    // salvar em JSON
    await new Promise(resolve => setTimeout(resolve, 1000)); // delay sacana
    return product;
};
