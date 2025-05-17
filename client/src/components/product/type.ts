import type { ProductStatuses } from "../../types/productTypes";

export interface IProductType {
  id: number;
  name: string;
  imgURL: string | null;
  price: number;
  discount: number;
  courier_id: number;
  endPrice: number;
  status: ProductStatuses;
}
