import axios from "axios";

const BASE_URL = 'http://192.168.0.223:8001';
// const BASE_URL = 'https://www.pptshopee.in/';
// const BASE_URL = 'https://shopmytool.in/';

const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


//Get EndPoint Api's

export const getBanners  = async () => {
    try {
      // const response = await Axios.get('banner/'); // API 
      const response = await Axios.get('get_banner/'); // API endpoint for banners
      return response.data; // Return fetched data
    } catch (error) {
      throw error; // Forward the error to be handled in the component
    }
  };

  export const cardDetails = async () => {
    try {
      const response = await Axios.get('get_Profession/'); // API endpoint for Profession
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Forward the error to be handled in the component
    }
  }
  export const shopByCategory = async () => {
    try {
      const response = await Axios.get('get_products_categoryone/'); // API endpoint for Shop By Category
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Forward the error to be handled in the component
    }
  }

    export const menuItems = async () =>{
    try{
      const response =await Axios.get('get_product_category/');
      // console.log(response.data);
      return response.data;
    }catch(err){
      console.log(err);
      throw err;
    }
  }
  export const shopByProf = async (profRef) => {
    try {
      const response = await Axios.get(`profession/?param_other1=${profRef}`); // API endpoint for Shop By Profession
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Forward the error to be handled in the component
    }
  }
  export const productDetailRef = async (profRef) => {
    try {
      const response = await Axios.get(`get/?input_id=3.72&param_other1=10000003&user_id=`); // API endpoint for ProductDetails
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Forward the error to be handled in the component
    }
  }




  // Post EndPoint Api's

  export const signUpRef = async(payload) =>{
    try{
      console.log(payload);
      const response = await Axios.post('api/register/',payload); // API endpoint for Sign Up (OR) register
      // console.log(response.data);
      return response.data;
    }catch(err){
      throw err;  // Forward the error to be handled in the component
    }
  }
  export const signInRef = async(payload) =>{
    try{
      console.log(payload);
      const response = await Axios.post('/api/login/',payload); //API endpoint for login or signin
      console.log(response.data)
      return response.data;
    }catch(err){
      throw err; // Forward the error to be handled in the component
    }
  }


  export const changePasswordRef = async (payload) =>{
    try{
      const response = await Axios.post('Changepassword/',payload);
      return response.data;
    }catch(err){
      throw err;
    }
  }

