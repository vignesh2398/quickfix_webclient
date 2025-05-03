import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";
import { app } from "./constant";
// import Cookies from 'js-cookie';


const ProtectedRoute = ({ children }) => {
    const validateUser=  axios.get(`${app.backendUrl}/validate/user`).then((data)=>{

    })




  return children;
};

export default ProtectedRoute;
