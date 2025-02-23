import axios from "axios";
import urlConfig from "../../urlConfig";


export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`${urlConfig.PRODUCT}`);
    return response.data.message;
  } catch (error) {
    console.error("Get all Product failed:", error);
    throw error;
  }
};