import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userAuthState } from '../redux/Authentication-slices/Auth-data';
import { FaSearch, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import '../css/navbar.css'
const Navbar = () => {
  const [searchvalue, setsearchvalue] = useState("")
  const handleChange = (e) => {
    setsearchvalue(e.target.value)
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const currentUser = localStorage.getItem('name');
  const roles = localStorage.getItem('roles');
  const handleLogout = () => {
    navigate('/signup');
    localStorage.removeItem("accessToken");
    dispatch(userAuthState());
  };
  const handleClick = () => {
    navigate(`/blogs/${searchvalue}`);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-transparent">
      <div className="container-fluid">
        <NavLink className="navbar-brand fs-2" to='/'>Blogify</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 " >
            <li className="nav-item">
              <NavLink className="nav-link fs-5" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fs-5" aria-current="page" to='/savedblogs'>
                Saved Blogs
              </NavLink>
            </li>
            {roles === "ADMIN" ?
              <li className="nav-item">
                <NavLink className="nav-link fs-5" aria-current="page" to="/addblog">
                  Add Blog
                </NavLink>
              </li> : ""
            }
          </ul>
          <form className="d-flex my-2 ms-auto" role="search">
            <input className="form-control mt-2 navbar-search " value={searchvalue} onChange={handleChange} type="search" placeholder="Search blog" aria-label="Search" />
            <button className="btn fs-2  btn-outline-success bg-transparent text-secondary " onClick={handleClick} type="submit">
              <FaSearch />
            </button>
          </form>
          {!accessToken ?
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-user fs-2"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><NavLink to="/signup" className="dropdown-item"><FaUserPlus className="me-1" /> Signup</NavLink></li>
                  <li><NavLink to="/login" className="dropdown-item"><FaSignInAlt className="me-1" /> Login</NavLink></li>
                </ul>
              </li>
            </ul>
            :
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle fs-5" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-user fs-2"></i>{currentUser}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><NavLink className="dropdown-item" onClick={handleLogout}><FaSignInAlt className="me-1" /> Logout</NavLink></li>
                </ul>
              </li>
            </ul>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;