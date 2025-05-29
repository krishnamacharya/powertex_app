import React, { createContext, useState } from "react";



export const CardContext=createContext();

export const CardDataProvider = ({children})=>{
    const [cardData,setCardData]=useState([])
    const [category,setCategory]=useState([]);
    return(
        <CardContext.Provider value={{cardData,setCardData,category,setCategory}} >
            {children}
        </CardContext.Provider>
    )
}