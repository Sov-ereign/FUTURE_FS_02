import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Eye, EyeOff } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import { NeonCard } from './NeonCard';
import { GlowingButton } from './GlowingButton';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, register: registerUser } = useUserStore();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginForm>();
  const registerForm = useForm<RegisterForm>();

  if (!isOpen) return null;

  const handleLogin = async (data: LoginForm) => {
    setIsLoading(true);
    const success = await login(data.email, data.password);
    setIsLoading(false);
    
    if (success) {
      onClose();
      loginForm.reset();
    } else {
      loginForm.setError('password', { message: 'Invalid credentials' });
    }
  };

  const handleRegister = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      registerForm.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }

    setIsLoading(true);
    const success = await registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    });
    setIsLoading(false);

    if (success) {
      onClose();
      registerForm.reset();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" onClick={onClose} />
      <NeonCard glowColor="cyan" intensity="high" className="relative w-full max-w-md mx-4 p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-cyan-500/10 rounded-full transition-colors text-cyan-400"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="text-gray-300">
            {isLogin ? 'Welcome back!' : 'Join our community today'}
          </p>
        </div>

        {isLogin ? (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-1">
                Email
              </label>
              <input
                type="email"
                {...loginForm.register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                placeholder="Enter your email"
              />
              {loginForm.formState.errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-cyan-400 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...loginForm.register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {loginForm.formState.errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <GlowingButton
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </GlowingButton>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-1">
                  First Name
                </label>
                <input
                  {...registerForm.register('firstName', { required: 'First name is required' })}
                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                  placeholder="First name"
                />
                {registerForm.formState.errors.firstName && (
                  <p className="text-red-400 text-sm mt-1">
                    {registerForm.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-1">
                  Last Name
                </label>
                <input
                  {...registerForm.register('lastName', { required: 'Last name is required' })}
                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                  placeholder="Last name"
                />
                {registerForm.formState.errors.lastName && (
                  <p className="text-red-400 text-sm mt-1">
                    {registerForm.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-1">
                Email
              </label>
              <input
                type="email"
                {...registerForm.register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                placeholder="Enter your email"
              />
              {registerForm.formState.errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {registerForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-1">
                Password
              </label>
              <input
                type="password"
                {...registerForm.register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                placeholder="Enter your password"
              />
              {registerForm.formState.errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {registerForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                {...registerForm.register('confirmPassword', { required: 'Please confirm your password' })}
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                placeholder="Confirm your password"
              />
              {registerForm.formState.errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {registerForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <GlowingButton
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </GlowingButton>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-cyan-400 hover:text-purple-400 text-sm font-medium transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </NeonCard>
    </div>
  );
};