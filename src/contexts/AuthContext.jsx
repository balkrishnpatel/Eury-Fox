import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any email with password "admin123"
    if (password === 'admin123') {
      const userData = {
        id: '1',
        email: email,
        name: email.split('@')[0]
      };
      
      setUser(userData);
      localStorage.setItem('adminUser', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  const sendResetOTP = async (email) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo, always return true
    setIsLoading(false);
    return true;
  };

  const verifyOTPAndResetPassword = async (email, otp, newPassword) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, accept OTP "123456"
    if (otp === '123456') {
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    sendResetOTP,
    verifyOTPAndResetPassword,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};