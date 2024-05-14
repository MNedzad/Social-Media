import { useContext, React, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ConfigData from "../config.json"

function Registration() {
  const adress = ConfigData['U2VydmVyLVNpZGUtSXA=']
  const nav = useNavigate();
  const initialValues = {
    username: "",
    password: ""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3, "User Name must be min 3 and max 15").max(15, "User Name must be min 3 and max 15").required("You must input a Username!"),
    email: Yup.string().email("Enter Valid Email").required("You must enter Email"),
    password: Yup.string().min(8, "Password must be min 8").required("You must input a Password!"),
    confirmPassword: Yup.string().min(8, "Password must be min 8").required("You must input a Password!").oneOf([Yup.ref("password")], "Password must match")
  });

  const onSubmit = (data) => {
    
    axios.post(`${adress}auth`, data).then((res) => {
      if (res.data.error) { alert(res.data.error); }
      else {

        axios.post(`${adress}auth/login`, data).then((res) => {
          if (res.data.error) { alert(res.data.error); }
          else {

            localStorage.setItem("accessToken", res.data);
            window.location.reload()
          }
        })
      }
    })
  }
  return (
    <div className="container"><div className="signup">
      <h1>Registration</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="signupForm">
          <label>Username: </label>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />
          <div className='error'><ErrorMessage name="username" component="span" /></div>
          <label>Email: </label>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="email"
            placeholder="(Ex. John123@...)"
          />
          <div className='error'>  <ErrorMessage name="email" component="span" /></div>
          <label>Password: </label>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="password"
            placeholder="********"
          />
          <div className='error'>   <ErrorMessage name="password" component="span" /></div>

          <label>Confirm Password: </label>
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="confirmPassword"
            placeholder="********"
          />
          <div className='error'>  <ErrorMessage name="confirmPassword" component="span" /></div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div></div>
  )

}

export default Registration