import { Product } from '../interfaces/Product';
import axios from 'axios'


const API_BASE_URL = 'http://localhost:8080/api/products';

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>(API_BASE_URL);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
}
