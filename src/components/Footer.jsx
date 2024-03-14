import React from 'react'
import { NavLink } from 'react-router-dom';
const Footer = () => {
    const roles = localStorage.getItem('roles');
    return (
        <div className="container" >
            <footer className="py-5">
                <div className="row">
                    <div className="col-6 col-md-2 mb-3">
                        <h4>Section</h4>
                        <ul className=" nav flex-column">
                            <li className="nav-item mb-1">
                                <NavLink className="nav-link fs-5" style={{ color: 'inherit' }} aria-current="page" to='/'>
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item mb-1">
                                <NavLink className="nav-link fs-5" style={{ color: 'inherit' }} aria-current="page" to='/savedblogs'>
                                    Saved Blogs
                                </NavLink>
                            </li>
                            {roles === "ADMIN" ?
                                <li className="nav-item mb-1">
                                    <NavLink className="nav-link fs-5" style={{ color: 'inherit' }} aria-current="page" to='/addblog'>
                                        Add Blog
                                    </NavLink>
                                </li> : ""
                            }
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">

                    </div>

                    <div className="col-6 col-md-2 mb-3">

                    </div>

                    <div className="col-md-5 offset-md-1 mb-3 d-flex align-items-start justify-content-center flex-column ">
                        <h2>Blogify</h2>
                        <p>Blogify, developed by Power Coders, is your go-to platform for seamless blogging experiences. We're committed to empowering your online presence with innovative solutions.</p>
                    </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <p>© 2022 Company, Inc. All rights reserved.</p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3"><a className="link-dark" href="#">Twitter</a></li>
                        <li className="ms-3"><a className="link-dark" href="#">Instagram</a></li>
                        <li className="ms-3"><a className="link-dark" href="#">Facebook</a></li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}
export default Footer
