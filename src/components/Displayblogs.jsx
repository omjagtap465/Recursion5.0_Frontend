// Import necessary dependencies
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogs, deleteBlog } from '../redux/Blog-slices/Blog-data';
import { useNavigate } from 'react-router-dom';
import Carousel from './sideEffects/Carousel'
const Displayblogs = () => {
  const dispatch = useDispatch();
  let blogs = useSelector((state) => state.blogs.value);
  const comments = useSelector((state) => state.comments.value);
  const navigate = useNavigate();
  const roles = localStorage.getItem('roles');

  useEffect(() => {
    dispatch(getBlogs(comments));
  }, [comments, dispatch]);

  const handleClick = (blog) => {
    navigate(`/blog/${blog._id}`, { state: blog });
  };
  return (
    <>
      <div >
        <Carousel />
      </div>
      <div className='container mt-5'>
        <h1>Global feeds...</h1>
      </div>
      <div className='d-flex   justify-content-centermx-2 mt-3' style={{ flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
        {blogs && blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div key={index} className="card mx-4 my-3 " style={{ width: '28rem', height: "30rem", cursor: "pointer" }}>
              <div className='position-relative  border' onClick={() => handleClick(blog)}>
                <img src={`./images/${blog.thumbnail}`} className="card-img-top" style={{ "height": "16rem" }} alt={blog.title} />
              </div>
              <div className="card-body d-flex justify-content-between">
                <div onClick={() => handleClick(blog)}>
                  <h2 className="card-title">{blog.title.substring(0, 20)}  </h2>
                  <p className="card-text fs-5">{blog.description.substring(0, 120)}...</p>
                </div>
                {roles === "ADMIN" ?
                  <div>
                    <button className='border border-0 bg-transparent' onClick={() => dispatch(deleteBlog(blog._id))}>
                      <i className="fa-solid fa-trash fs-4   text-danger-emphasis"></i>
                    </button>
                  </div> : ""
                }
              </div>
            </div>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </>
  );
};

export default Displayblogs;



