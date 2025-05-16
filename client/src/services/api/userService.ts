import $api from "../../configs/axiosConfig";
import type { IUser } from "../../types/userTypes";
import type { IUpdateWalletData } from "../models/userModels";

const USER = "/user";

export const userService = {
  update: async (formData: IUpdateWalletData): Promise<IUser> => {
    const { data } = await $api.put(`${USER}`, formData);
    return data;
  },
};
