import apiClient from "./axiosConfig";

export const userService = {
    // Lấy danh sách users
    getUsers: async () => {
      try {
        const response = await apiClient.get('/users');
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  
    // Thêm user mới
    createUser: async (userData) => {
      try {
        console.log(`userData: `,userData)
        const response = await apiClient.post('/users', userData);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  
    // Cập nhật user
    updateUser: async (id, userData) => {
      try {
        const response = await apiClient.put(`/users/${id}`, userData);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  
    // Xóa user
    deleteUser: async (id) => {
      try {
        const response = await apiClient.delete(`/users/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  };