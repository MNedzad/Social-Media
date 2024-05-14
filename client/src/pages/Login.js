import { AuthContext } from './Helper/authContext';
import axios from 'axios';
import { useState, Yup, useNavigate, config, useContext, useEffect, Formik, Form, Field, ErrorMessage } from "../imports"

function login() {

  const nav = useNavigate();
  const { authState } = useContext(AuthContext);
  const adress = config['U2VydmVyLVNpZGUtSXA=']







  const initialValues = {
    username: "",
    password: ""
  };


  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3, "User Name must be min 3 and max 15").max(15, "User Name must be min 3 and max 15").required("You must input a Username!"),
    password: Yup.string().required("You must input a Password!")
  });

  const onSubmit = (data) => {

    axios.post(`${adress}auth/login`, data).then((res) => {
      if (res.data.error) { alert(res.data.error); }
      else {
        localStorage.setItem("accessToken", res.data);


        location.reload()
      }
    })
  }


  return (
    <div className="container"><div className="signin">
      <h1>Sign In</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="LoginForm">
          <label>Username: </label>
          <Field
            autoComplete="off"
            id="usernamefield"
            name="username"
            placeholder="(Ex. John123...)"
          />
          
          <div className='error'><ErrorMessage name="username" component="span" /></div>

          
          <label>Password: </label>
          <Field
            autoComplete="off"
            id="passwordfield"
            name="password"
            placeholder="********"
          />
          
          <div className='error'>   <ErrorMessage name="password" component="span" />  <a href='#'>Forge password</a></div>
         
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div></div>
  )

}

export default login