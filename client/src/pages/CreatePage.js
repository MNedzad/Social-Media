import {React,useContext, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from './Helper/authContext';
import {useToast} from "@chakra-ui/toast"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ConfigData from "../config.json"
import { useNavigate } from "react-router-dom";

function BasicAlerts() {
  
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">This is an error alert — check it out!</Alert>
      <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert>
    </Stack>
  );
}

function CreatePost() {
  const nav = useNavigate();
  const adress = ConfigData['U2VydmVyLVNpZGUtSXA=']
  const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

  const isValidFileType = (fileName, fileType)=>{
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
  }

  
  const {setAuthState} = useContext(AuthContext);
  const [image , setImage] = useState();
  const toast = useToast()

  let img = null
  const handleChange = (e) => {
    img = e.target.files[0]
    var reader = new FileReader();
  
  
    reader.onload = function (e) 
    {
      
      document.querySelector("#img").setAttribute('src', e.target.result);
      document.querySelector("#img").style.opacity = 1;
    }
    reader.readAsDataURL(img);
}

  
    const initialValues = {
      title: "",
      postText: "",

    };

    const validationSchema = Yup.object().shape({
      title: Yup.string().required("You must input a Title!").min(4,"Title must have min 10 Character").max(40,"Title must have max 30 Character"),
      postText: Yup.string().required("You must input a PostText!").min(10,"Title must have min 10 Character").max(500,"Title must have max 100 Character"),
      
    });

    const onSubmit = (data) => {
      try {
        var form = new FormData();
        form.append("image", img)
        form.append("title", data.title)
        form.append("postText", data.postText);
        form.append("PostRole" , data.Role)

        axios.post(`${adress}post`, form,
        {
          headers: {accessToken: localStorage.getItem("accessToken")}
        }).then((response) => {
          if(response.data == "Photo Upload!")
            toast({
              title: `Post Created`,
              description: `You Create a post`,
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
            nav('/');
        });
      } catch (error) {
        console.log("Toast");
      }
    }
    
    return (
      <div className="container">
        <div className="createPost">
          <h1>Create Page</h1>
          
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            
            <Form className="formContainer">
              <label>Title: </label>
              
              <Field
                autoComplete="off"
                id="inputCreatePost"
                name="title"
                placeholder="(Ex. Title...)"
              />
              <ErrorMessage name="title" component="span" />
              <label>Post: </label>
              
              <Field
                autoComplete="off"
                id="inputCreatePost"
                name="postText"
                placeholder="(Ex. Post...)"
              />
              <ErrorMessage name="postText" component="span" />

              <input  type={"file"} name="image" onChange={handleChange} title="Choose a video please" id="file-input" ></input>
              <div className="Input">
                <label id="inputLabel" htmlFor="file-input">Select a File</label>
                <img id="img" src={img} />
                
                <div role="group" aria-labelledby="my-radio-group">
                  <label>
                    <Field type="radio" name="Role" value="Public" />
                    Public
                  </label>
                  <label>
                    <Field type="radio" name="Role" value="Private" />
                    Private
                  </label>
                </div>
              
              </div>
              <ErrorMessage name="image" component="span" />

              <button type="submit"> Create Post</button>
            </Form>
          </Formik>
        </div>
      </div>
    );
  
}

export default CreatePost;