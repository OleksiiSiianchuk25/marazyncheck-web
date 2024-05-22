import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8080/api/auth/';

export interface LoginResponse {
  jwtToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  telegram?: string;
}

class AuthService {
  login(loginRequest: LoginRequest): Promise<LoginResponse> {
    return axios.post<LoginResponse>(API_URL + 'login', loginRequest)
      .then(response => {
        if (response.data.jwtToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  register(registerRequest: RegisterRequest): Promise<void> {
    return axios.post(API_URL + 'register', registerRequest);
  }

  getCurrentUser(): LoginResponse | null {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  logout(navigate: (path: string) => void): void {
    localStorage.removeItem('user');
    navigate('/login'); 
  }
}

export default new AuthService();
