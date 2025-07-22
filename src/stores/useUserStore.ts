import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Order } from '../types';

interface UserStore {
  user: User | null;
  orders: Order[];
  isLoginModalOpen: boolean;
  
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  setIsLoginModalOpen: (isOpen: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      orders: [],
      isLoginModalOpen: false,

      login: async (email, password) => {
        // Simulate login with delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simple validation for demo
        if (email && password.length >= 6) {
          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            firstName: 'John',
            lastName: 'Doe'
          };
          set({ user });
          return true;
        }
        return false;
      },

      register: async (userData) => {
        // Simulate registration with delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          ...userData
        };
        set({ user });
        return true;
      },

      logout: () => {
        set({ user: null });
      },

      addOrder: (orderData) => {
        const order: Order = {
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
          ...orderData
        };
        set({ orders: [...get().orders, order] });
      },

      setIsLoginModalOpen: (isOpen) => set({ isLoginModalOpen: isOpen }),
    }),
    {
      name: 'user-storage',
    }
  )
);