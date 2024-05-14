import './App.sass';
import { useState, Avatar, useEffect, Router, Route, Routes, Link } from './imports';
import { Home, CreatePost, Post, Login, Register, Signin, Pagenot } from './imports';
import { useToast, ChakraProvider, Footer, ProfileMenu, checkAuth, ErrorBoundary } from './imports'
import axios from 'axios';
import { AuthContext, Message } from './pages/Helper/authContext';
import { Navigate, redirect, Redirect } from 'react-router-dom';
import React from 'react';


function App() {


  const toast = useToast();
  const [authState, setAuthState] = useState({status: false, error: ""});
  const [showmenu, setShowMenu] = useState(false);

  const AuthCheck = () =>
  {
    useEffect(() =>
    {
      const Test = async () =>
      {
        
       var status = await checkAuth().then((data) =>
        { 
          console.log(data);
        }).catch(err =>
        {
          return "Error"
        })
        
        return status; 
      }
      
    }, [])
  }


  //const notify = () => toast({ title: "Success Notification !", status: "success" });

  try {

    return (

      <div className="App">
        <ErrorBoundary Toast={toast}>
            <AuthCheck />
        </ErrorBoundary>
        <AuthContext.Provider value={{ authState, setAuthState }} >
          <Router>
            <div className='nav-bar'>
              <ul>
                <li>
                  {/* <Link className='link' onClick={window.location.reload}to="/"> Home Page</Link>  */}
                  {authState === true && (
                    <>
                      <div className='LA'>
                        <Link className='link' onClick={() => window.location.reload} to="/Createpost"> Create A Post</Link>
                        <div className='center'>
                          <Link className='link' onClick={() => window.location.reload} to="/foryou"> For You</Link>
                          <Link className='link' onClick={() => window.location.reload} to="/following"> Following</Link>
                        </div>

                      </div>

                      <div className='avatar'>
                        <button onClick={() => { showmenu === true ? setShowMenu(false) : setShowMenu(true) }}>
                          <Avatar>A</Avatar>
                        </button>
                      </div>
                    </>
                  )}
                  {authState !== true && (
                    <>
                      <Link className='link' onClick={() => window.location.reload} to="/Login">Sign In</Link>
                      <Link className='link' onClick={() => window.location.reload} to="/Registration"> Registration </Link>
                    </>
                  )}
                </li>
              </ul>
            </div>
            {showmenu && (
              <div className='menu'><ProfileMenu /></div>
            )
            }
            <Routes>
              <Route path="/" element={authState === true ? <Navigate to="/foryou" /> : <Navigate to="/Login" />} />
              <Route path="/foryou" element={authState === true ? <Home></Home> : <Navigate to="/Login" />} />
              <Route path="/Createpost" element={authState === true ? <CreatePost></CreatePost> : <Navigate to="/Login" />} />
              <Route path="/Post/:id" element={authState === true ? <Post></Post> : <Navigate to="/Login" />} />
              <Route path="/Login" element={authState !== true ? <Login></Login> : <Navigate to="/foryou" />} />
              <Route path="/Registration" element={authState !== true ? <Register></Register> : <Navigate to="/foryou" />} />


              {/* <Route path="*" element={<Pagenot />} /> */}

            </Routes>
          </Router>

        </AuthContext.Provider>
        <Footer />
        <ChakraProvider />

      </div>
    );
  } catch (err) {
    console.log(err);
  }
}

export default App;
