// const BASKET = "/busket";
// const PROFILE = "/profile";
// const ORDERS = "/orders";

import type { IProductType } from "../../components/product/type";
import $api from "../../configs/axiosConfig";
import type {
  IProductFormData,
  IProductUpdateFormData,
} from "../models/productModels";
import { COURIER } from "./userService";

const PRODUCTS = "/products";

export const productService = {
  getCustomerProducts: async (): Promise<Array<IProductType> | []> => {
    const { data } = await $api.get(`${PRODUCTS}`);
    return data;
  },

  getCourierProducts: async (): Promise<Array<IProductType> | []> => {
    const { data } = await $api.get(`${COURIER}/${PRODUCTS}`);
    return data;
  },

  create: async (productData: IProductFormData): Promise<IProductType> => {
    const { data } = await $api.post(`${PRODUCTS}`, productData);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await $api.delete(`${PRODUCTS}/${id}`);
  },

  update: async (
    id: number,
    formData: IProductUpdateFormData
  ): Promise<IProductType> => {
    const { data } = await $api.put(`${PRODUCTS}/${id}`, formData);
    return data;
  },
};
