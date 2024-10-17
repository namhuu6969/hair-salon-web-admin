import api from "../config/axios/api";

export interface UserLogin {
  emailOrPhone: string;
  password: string;
}

export const userApi = {
  loginAccount: async (data: UserLogin) => {
    try {
      const response = await api.post("v1/user/signIn", data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
