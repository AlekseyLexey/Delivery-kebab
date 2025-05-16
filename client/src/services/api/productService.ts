// const BASKET = "/busket";
// const PROFILE = "/profile";
// const ORDERS = "/orders";

import type { IProductType } from "../../components/product/type";
import $api from "../../configs/axiosConfig";

const PRODUCTS = "/products";
const COURIER = "/courier";

export const productSrvice = {
  getCustomerProducts: async (): Promise<Array<IProductType> | []> => {
    const { data } = await $api.get(`${PRODUCTS}`);
    return data;
  },

  getCourierProducts: async (): Promise<Array<IProductType> | []> => {
    const { data } = await $api.get(`${COURIER}/${PRODUCTS}`);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await $api.delete(`${PRODUCTS}/${id}`);
  },

  //! Подписать тип formData!
  update: async (formData): Promise<IProductType> => {
    const { data } = await $api.put(`${PRODUCTS}`);
    return data;
  },
};
