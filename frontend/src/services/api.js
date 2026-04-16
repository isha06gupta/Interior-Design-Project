import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const getAllDesigns = async (userId) => {
  const response = await api.get(`/designs?userId=${userId}`);
  return response.data;
};

export const createDesign = async (formData) => {
  const response = await api.post("/designs", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};

export const updateDesign = async (id, designData) => {
  const response = await api.put(`/designs/${id}`, designData);
  return response.data;
};

export const deleteDesign = async (id) => {
  const response = await api.delete(`/designs/${id}`);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/users/login", userData);
  return response.data;
};

export default api;