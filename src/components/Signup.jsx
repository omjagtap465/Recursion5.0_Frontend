import React, { useState } from 'react';
import '../css/signup.css';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/Authentication-slices/Auth-data';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    setSignup({
      ...signup,
      [event.target.name]: event.target.value
    });
  }

  const handleRegister = () => {
    dispatch(createUser(signup))
      .then((userData) => {
        localStorage.setItem('accessToken', userData.token);
        localStorage.setItem('name', userData.name);
        localStorage.setItem('roles', userData.roles);
        localStorage.setItem('userid', userData._id);
        setSignup({
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
          <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' alt="Signup" />
        </div>

        <div className="signup-form">
          <h1 className="text-center fw-bold mb-5">Sign up</h1>

          <div className="input-group mb-4">
            <input
              id="form1"
              type="text"
              className="w-100 rounded-4"
              name='name'
              onChange={handleChange}
              value={signup.name}
              placeholder='Enter your name'
            />
          </div>
          <div className="input-group mb-4">
            <input
              id="form2"
              className="rounded-4"
              onChange={handleChange}
              name='email'
              value={signup.email}
              placeholder='Enter your email'
              type="email"
            />
          </div>
          <div className="input-group mb-4">
            <input
              id="form3"
              className="rounded-4"
              onChange={handleChange}
              name='password'
              value={signup.password}
              placeholder='Enter your password'
              type="password"
            />
          </div>
          <button className='btn mb-4' onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;


