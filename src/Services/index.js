import axios from "axios";

const BASE_URL = 'http://192.168.0.223:8001/';
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
  export const searchProduct = async (data) => {
    // console.log(data);
    try {
      // http://192.168.0.223:8001//search/?search=angle
      const response = await Axios.get(`search/?search=${data}`); // API endpoint for Shop By Category
      // console.log(response.data,"service resp of search")
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
    export const getAddress = async (id) =>{
    try{
      const response =await Axios.get(`post_profile_address/?id=${id}`);
      // console.log(response.data);
      return response.data;
    }catch(err){
      console.log(err);
      throw err;
    }
  }
    export const newarrivals = async () =>{
    try{
      const response =await Axios.get('newarrivals/');
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
  export const productDetailRef = async (id) => {
    try {
      console.log(id);
      const response = await Axios.get(`get_product_details/?productid=${id.id}`); // API endpoint for ProductDetails
      console.log(response)
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
      const response = await Axios.post('api/login/',payload); //API endpoint for login or signin
      console.log(response)
      return response.data;
    }catch(err){
      throw err; // Forward the error to be handled in the component
    }
  }


  export const changePasswordRef = async (payload) =>{
    try{
      console.log(payload);
      const response = await Axios.post('Changepassword/',payload);
      return response.data;
    }catch(err){
      throw err;
    }
  }
  export const postAddress = async (payload) =>{
    try{
      console.log(payload);
      const response = await Axios.post('post_profile_address/',payload);
      return response.data;
    }catch(err){
      throw err;
    }
  }

