import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import ApiConfig from '../../config/ApiConfig';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const register = async (first_name, last_name, email, phone_no) => {
    try {
      const response = await axios.post(
        `${ApiConfig.ApiPrefix}/auth/register/user`,
        { first_name, last_name, email, phone_no }
      );
      const { token } = response.data; 
      const decodedToken = jwtDecode(token);
      localStorage.setItem('accessToken', token);
      console.log(decodedToken);
      localStorage.setItem('userId', decodedToken.id);
      localStorage.setItem('firstName', decodedToken.first_name);

      dispatch({ type: 'REGISTER_SUCCESS', payload: { user: decodedToken } });
      return { success: true, message: 'Registration successful!' };
    } catch (error) {
      console.error('Registration error:', error.response.data);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === 'Email already exists'
      ) {
        return { success: false, message: 'Email already exists. Please use a different email.' };
      } else {
        return { success: false, message: 'Registration failed. Please try again later.' };
      }
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
