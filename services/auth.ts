import { User } from '@/types';
import { mockUser } from '@/lib/mockData';

const SIMULATED_DELAY = 800;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    await delay(SIMULATED_DELAY);
    
    if (email && password) {
      const token = 'mock-jwt-token-' + Date.now();
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }
      return { user: mockUser, token };
    }
    
    throw new Error('Invalid credentials');
  },

  async register(username: string, email: string, password: string): Promise<{ user: User; token: string }> {
    await delay(SIMULATED_DELAY);
    
    if (username && email && password) {
      const token = 'mock-jwt-token-' + Date.now();
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }
      
      const newUser: User = {
        id: Math.floor(Math.random() * 1000),
        username,
        email,
        avatar: `https://i.pravatar.cc/150?u=${email}`,
        created_at: new Date().toISOString(),
      };
      
      return { user: newUser, token };
    }
    
    throw new Error('Registration failed');
  },

  async logout(): Promise<void> {
    await delay(SIMULATED_DELAY);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },

  async getCurrentUser(): Promise<User | null> {
    await delay(SIMULATED_DELAY);
    
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        return mockUser;
      }
    }
    return null;
  },

  async checkAuth(): Promise<boolean> {
    await delay(SIMULATED_DELAY);
    
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  },
};
