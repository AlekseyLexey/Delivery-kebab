import type { IProductType } from "../components/product/type";

export type OrdersType = Array<IOrder> | [];

export interface IOrder {
  customer: ICustomer;
  products: Array<IProductType>;
}

interface ICustomer {
  id: number;
  phone: string;
  username: string;
  email: string;
  location: string | null;
}

// [
// 	{
// 		 "customer": {
// 			  "id": 1,
// 			  "phone": "89998887771",
// 			  "username": "Alex",
// 			  "email": "alex@test.com",
// 			  "location": null
// 		 },
// 		 "products": [
// 			  {
// 					"id": 2,
// 					"name": "Пицца",
// 					"imgURL": null,
// 					"price": 700,
// 					"discount": 20,
// 					"createdAt": "2025-05-16T01:26:22.661Z"
// 			  },
// 			  {
// 					"id": 4,
// 					"name": "Салат Цезарь",
// 					"imgURL": null,
// 					"price": 350,
// 					"discount": 15,
// 					"createdAt": "2025-05-16T01:26:22.661Z"
// 			  }
// 		 ],
// 		 "totalAmount": 858,
// 		 "totalItems": 2
// 	}
// ]
