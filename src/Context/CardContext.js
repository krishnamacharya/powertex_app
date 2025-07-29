import React, { createContext, useState ,useEffect} from "react";



export const CardContext=createContext();

export const CardDataProvider = ({children})=>{
    const [cardData,setCardData]=useState([])
    const [category,setCategory]=useState([]);
    const [userData,setUserData]=useState([]);

    useEffect(() => {
    const getUserData = async () => {
      try {
        const value = await AsyncStorage.getItem('userData');
        if (value !== null) {
          setUserData(JSON.parse(value));
        }
      } catch (e) {
        console.error("Failed to load userData:", e);
      }
    };

    getUserData();
  }, []);
    return(
        <CardContext.Provider value={{cardData,setCardData,category,userData,setUserData,setCategory}} >
            {children}
        </CardContext.Provider>
    )
}