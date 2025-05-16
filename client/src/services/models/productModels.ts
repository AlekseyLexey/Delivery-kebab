export interface IProductFormData {
  name: string;
  price: string;
  discount: string;
  imgURL: File | null;
}
import type { ProductStatuses } from "../../types/productTypes";

export interface IProductUpdateFormData {
  name?: string;
  imgURL?: string;
  discount?: number;
  status?: ProductStatuses;
  price?: number;
}
