import axios from "axios";
import {useState , config} from "../imports";

export default async function  checkAuth() {
  const adress = config["U2VydmVyLVNpZGUtSXA="]
  
    var status = await axios.request({method: "GET", url: `${adress}auth/auth`, headers: {accessToken: localStorage.getItem("accessToken")}})
    .then((res) => {
        if(res.data['error'] === undefined){
        
          return true;
        }
        return false
        
    })

    return status;
}
