import $api from "../../configs/axiosConfig";
import type {
  IAuthFormData,
  IRegistrationFormData,
} from "../../types/userTypes";
import type { IAuthResponse } from "../models/authModels";

const refreshReq = async (): Promise<IAuthResponse> => {
  try {
    const { data } = await $api.get("/refresh");
    localStorage.setItem("token", data.accessToken);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const logoutReq = async (): Promise<void> => {
  try {
    const { data } = await $api.post("/logout");
    localStorage.removeItem("token");

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const authReq = async (
  url: string,
  formData: IAuthFormData | IRegistrationFormData
): Promise<IAuthResponse> => {
  try {
    const { data } = await $api.post(url, formData);
    localStorage.setItem("token", data.accessToken);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { refreshReq, logoutReq, authReq };
