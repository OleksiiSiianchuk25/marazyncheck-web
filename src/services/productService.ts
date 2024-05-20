import axiosInstance from './axiosInstance';
import { Product } from '../interfaces/Product';

const API_BASE_URL = '/products';

export const getAllProducts = async (categories?: number[]): Promise<Product[]> => {
  try {
    const query = categories && categories.length > 0 
      ? `?${categories.map(cat => `categories=${cat}`).join('&')}`
      : '';
    const response = await axiosInstance.get<Product[]>(`${API_BASE_URL}${query}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};
