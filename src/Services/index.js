import axios from "axios";

// const BASE_URL = 'http://192.168.0.223:8000';
const BASE_URL = 'http://192.168.0.223:8000';

const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBanners  = async () => {
    try {
      const response = await Axios.get('/banner/'); // API 
      return response.data; // Return fetched data
    } catch (error) {
      throw error; // Forward the error to be handled in the component
    }
  };

  export const Register = async (data) => {
    try {
      const response = await Axios.post('/signup/', data); // API endpoint for signup
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Forward the error to be handled in the component
    }
  }
  export const cardDetails = async () => {
    try {
      const response = await Axios.get('/Shopbyspares/'); // API endpoint for card details
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Forward the error to be handled in the component
    }
  }
