import axios from "axios";
import urlConfig from "../../urlConfig";

export const fetchLogin = async (userData) => {
  try {
    const response = await axios.post(`${urlConfig.AUTH}/login`, userData, {
      withCredentials: true,
    });
    return response.data.message;
  } catch (error) {
    console.error("login failed:", error);
    throw error;
  }
};

export const fetchSignup = async (userData) => {
  try {
    const response = await axios.post(`${urlConfig.AUTH}/signup`, userData);
    return response.data.message;
  } catch (error) {
    console.error("signup failed:", error);
    throw error;
  }
};