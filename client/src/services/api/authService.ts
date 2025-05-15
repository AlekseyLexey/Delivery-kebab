import $api from "../../configs/axiosConfig";
import type {
  IAuthFormData,
  IRegistrationFormData,
} from "../../types/userTypes";

const refreshReq = async () => {
  try {
    const { data } = await $api.get("/refresh");
    localStorage.setItem("token", data.accessToken);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const logoutReq = async () => {
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
) => {
  try {
    const { data } = await $api.post(url, formData);
    localStorage.setItem("token", data.accessToken);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { refreshReq, logoutReq, authReq };
