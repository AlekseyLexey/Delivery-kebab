// const BASKET = "/busket";
// const PROFILE = "/profile";

import type { IProductType } from "../../components/product/type";
import $api from "../../configs/axiosConfig";
import type { OrdersType } from "../../types/orderTypes";
import { COURIER } from "./userService";

const ORDERS = "/orders";

export const orderSrvice = {
  // ?Working
  //   createOrder: async (): Promise<Array<IProductType> | []> => {
  //     const { data } = await $api.get(`${ORDERS}`);
  //     return data;
  //   },

  //   getCustomerOrders: async (): Promise<Array<> | []> => {
  //     const { data } = await $api.get(`${ORDERS}`);
  //     return data;
  //   },

  getCourierOrders: async (): Promise<OrdersType> => {
    const { data } = await $api.get(`${COURIER}/${ORDERS}`);
    return data;
  },

  //! Подписать тип formData!
  //   update: async (formData): Promise<IProductType> => {
  //     const { data } = await $api.put(`${PRODUCTS}`);
  //     return data;
  //   },
};
