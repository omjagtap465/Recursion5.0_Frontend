import React, { useState } from 'react';
import '../css/signup.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/Authentication-slices/Auth-data';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, setlogin] = useState({
    email: "",
    password: ""
  });
  const handleChange = (event) => {
    setlogin({
      ...login,
      [event.target.name]: event.target.value
    });
  }

  const handleLogin = () => {
    dispatch(loginUser(login))
      .then((userData) => {
        console.log(userData);
        localStorage.setItem('accessToken', userData.token);
        localStorage.setItem('name', userData.name);
        localStorage.setItem('roles', userData.roles);
        localStorage.setItem('userid', userData.userid);
        setlogin({
          name: "",
          email: "",
          password: ""
        });
        navigate('/')
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="app-container">
      <div className="signup-card">
        <div className="signup-image">
          <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' alt="Login" />
        </div>

        <div className="signup-form">
          <h1 className="text-center fw-bold mb-5">Login</h1>
          <div className="input-group mb-4">
            <input id="form2" className="rounded-4" placeholder='Enter your email' value={login.email} onChange={handleChange} name="email" type="email" />
          </div>
          <div className="input-group mb-4">
            <input id="form3" className="rounded-4" placeholder='Enter your password' value={login.password} onChange={handleChange} name="password" type="password" />
          </div>
          <button onClick={handleLogin} className='btn mb-4'>Login</button>
        </div>
      </div>
    </div>
  )
}
export default Login