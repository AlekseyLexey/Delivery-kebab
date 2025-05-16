import type { ProductStatuses } from "../../types/productTypes";

export interface IProductFormData {
  name?: string;
  imgURL?: string;
  discount?: number;
  status?: ProductStatuses;
}
