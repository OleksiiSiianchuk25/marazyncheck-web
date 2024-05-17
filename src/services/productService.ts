import axios from 'axios';
import { Product } from '../interfaces/Product';

const API_BASE_URL = 'http://localhost:8080/api/products';

export const getAllProducts = async (categories?: number[]): Promise<Product[]> => {
    try {
        const query = categories && categories.length > 0 
            ? `?${categories.map(cat => `categories=${cat}`).join('&')}`
            : '';
        const response = await axios.get<Product[]>(`${API_BASE_URL}${query}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
}
