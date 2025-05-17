import type { IProductType } from "../components/product/type";

export type OrdersType = Array<IOrder> | [];

export interface IOrder {
  customer: ICustomer;
  products: Array<IProductType>;
  totalItems: number;
  totalAmount: number;
}

interface ICustomer {
  id: number;
  phone: string;
  username: string;
  email: string;
  location: string | null;
}
