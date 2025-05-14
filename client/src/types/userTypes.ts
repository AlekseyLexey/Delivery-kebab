export type UserRole = "courier" | "customer";
export interface IUserPath {
  courier: "/profile";
  customer: "/products";
}

export const CITIES = [
  "Москва",
  "СПБ",
  "Екатеринбург",
  "Хабаровск",
  "Владивосток",
  "Краснодар",
  "Челябинск",
  "Сочи",
] as const;

type City = (typeof CITIES)[number];

export interface IAuthFormData {
  email: string;
  password: string;
}

export interface IRegistrationFormData extends IAuthFormData {
  username: string;
  city: City | "";
  role: UserRole | "";
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  city: string;
  role: UserRole;
  location: string;
  wallet: number;
  createdAt?: Date;
  updatedAt?: Date;
}
