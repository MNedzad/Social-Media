//Pages
export {default as Home} from './pages/Home';
export {default as CreatePost}  from './pages/CreatePage';
export {default as Post}  from './pages/Post';
export {default as Login}  from './pages/Login';
export {default as Register}  from './pages/Registration';
export {default as Signin}  from './pages/Signin';
export {default as ErrorBoundary}  from './pages/Helper/errorHandle';

//Component
export {default as Pagenot} from './pages/PageNotFound';
export {default as Footer } from './componets/footer';
export {AuthContext} from './pages/Helper/authContext';
export {default as ProfileMenu}  from './componets/ProfileMenu';
export {default as checkAuth} from './componets/handler'

//react
export {useState , useEffect, useContext} from 'react';
export {BrowserRouter as Router, Route, Routes, Link , useNavigate} from "react-router-dom";
export { ChakraProvider } from '@chakra-ui/react'

//Other
export { Avatar } from '@mui/material';
export {useToast} from "@chakra-ui/toast";
export * as Yup from "yup";
export { Formik, Form, Field, ErrorMessage } from "formik";

//config
export * as config from "./config.json"