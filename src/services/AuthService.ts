import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const API_URL = 'http://localhost:8080/api/auth/';

interface DecodedToken {
  sub: string; 
  role: string[]; 
  exp: number;
}

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
  login(loginRequest: LoginRequest): Promise<void> {
    return axios.post<LoginResponse>(API_URL + 'login', loginRequest)
      .then(response => {
        if (response.data.jwtToken) {
          const decoded: DecodedToken = jwtDecode(response.data.jwtToken);
          localStorage.setItem('user', JSON.stringify({
            jwtToken: response.data.jwtToken,
            roles: decoded.role,
          }));
        }
      });
  }

  register(registerRequest: RegisterRequest): Promise<void> {
    return axios.post(API_URL + 'register', registerRequest);
  }

  getCurrentUser(): { jwtToken: string; roles: string[]; } | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user ? user.roles.includes('ROLE_ADMIN') : false;
  }

  logout(navigate: (path: string) => void): void {
    localStorage.removeItem('user');
    navigate('/login'); 
  }

  updateToken(newToken: string): void {
    const user = this.getCurrentUser();
    if (user) {
      user.jwtToken = newToken;
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

}

export default new AuthService();
