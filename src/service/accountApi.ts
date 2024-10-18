import api from "../config/axios/api";

export const accountApi = {
  getAll: async () => {
    try {
      const response = await api.get("v1/account/getAll");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  deleteAccount: async (id: number) => {
    try {
      const response = await api.delete(`v1/account/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
