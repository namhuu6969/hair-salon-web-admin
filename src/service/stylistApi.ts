import api from "../config/axios/api";
import { StylistRequest } from "../model/Stylist";

export const stylistApi = {
  getAllStylist: async () => {
    try {
      const response = await api.get("stylist/getAll");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  addStylist: async (data: StylistRequest) => {
    try {
      const response = await api.post("stylist", data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  deleteStylist: async (id: number) => {
    try {
      const response = await api.delete(`stylist/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  updateStylist: async (id: number, data: StylistRequest) => {
    try {
      const response = await api.put(`stylist/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
