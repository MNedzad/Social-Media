import React from 'react'
import axios from "axios";
import { useEffect, useState,useContext } from 'react';
import {useToast} from "@chakra-ui/toast"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useRadio } from '@chakra-ui/react';
import { AuthContext } from './Helper/authContext';
import ConfigData from "../config.json"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

import Card from '../componets/card';


function Home() {
    
    const[userId, setUserId] = useState(0);
    const {authState} = useContext(AuthContext);
    const adress = ConfigData['U2VydmVyLVNpZGUtSXA=']
    const nav = useNavigate();
   
    const GetUserId = async () =>{
      const {data} = await axios.request({method: "GET", url: `${adress}auth/auth`, headers: {accessToken: localStorage.getItem("accessToken")}})

  
      setUserId(data.id);

    }
   
    useEffect(() =>{
      document.getElementsByClassName("nav-bar")[0].style.display = ""
      GetUserId();

    }, [])

    
    console.log(authState);
    return (
    
      <Card state = {authState} userid = {userId}/>
    
    )

}

export default Home