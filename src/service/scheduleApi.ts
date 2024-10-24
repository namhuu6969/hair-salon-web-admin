import api from "../config/axios/api";

export const scheduleApi = {
  getAllSchedule: async () => {
    try {
      const response = await api.get("schedules/all");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  createScheduleForstylist: async (stylistID: number, data: any) => {
    try {
      const response = await api.post(
        `schedules/create?stylistID=${stylistID}`,
        data
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getScheduleByStylist: async (id: string) => {
    try {
      const response = await api.get(`schedules/stylist/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  deleteSchedule: async (id: number) => {
    try {
      const response = await api.delete(`schedules/delete/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
