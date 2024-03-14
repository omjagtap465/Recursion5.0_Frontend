import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Displaycomments from './Displaycomments';

const BlogDetails = () => {
  const location = useLocation();
  const blog = location.state;
  const accessToken = localStorage.getItem('accessToken');
  const [likeLength, setLikeLength] = useState(null);
  const [wishlistSuccess, setwishlistSuccess] = useState(false);
  const [likeSuccess, setlikeSuccess] = useState(false)
  const [blogUser, setblogUser] = useState(null)
  const likeApi = async (_id) => {
    try {
      const response = await fetch(`http://localhost:3000/blogsapi/like/${_id}`, {
        method: "GET",
        headers: {
          authorization: `bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        console.error(response.statusText);
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        return result.success;
      }
    } catch (error) {
      console.log('An error occurred during likes:', error);
    }
  };
  const wishlistApi = async (_id) => {
    try {
      const response = await fetch(`http://localhost:3000/blogsapi/wishlist/${_id}`, {
        method: "GET",
        headers: {
          authorization: `bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        console.error(response.statusText);
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        return result.success;
      }
    } catch (error) {
      console.log('An error occurred during likes:', error);
    }
  };
  const likeLengthFunction = async (_id) => {
    try {
      const response = await fetch(`http://localhost:3000/blogsapi/likelength/${_id}`, {
        method: "GET",
        headers: {
          authorization: `bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        console.error(response.statusText);
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setLikeLength(result.likeLength);
      }
    } catch (error) {
      console.log('An error occurred during likes:', error);
    }
  };
  const findBlogUser = async (_id) => {
    try {
      const response = await fetch(`http://localhost:3000/blogsapi/findblog/${_id}`);

      if (!response.ok) {
        console.error(response.statusText);
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }

      if (response.ok) {
        const result = await response.json();
        setblogUser(result.name)
      }
    } catch (error) {
      console.log('An error occurred during likes:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await likeLengthFunction(blog._id);
      let revalueLike = await likeApi(blog._id);
      setlikeSuccess(revalueLike)
      let revalueWishlist = await wishlistApi(blog._id);
      setwishlistSuccess(revalueWishlist)
      await findBlogUser(blog._id)
    };
    fetchData();
  }, []);

  if (!blog) {
    return <p>No blog details available</p>;
  }

  const mainCss = {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
  };
  const handleLikeClick = async () => {
    let revalue = await likeApi(blog._id);
    setlikeSuccess(revalue)
    await likeLengthFunction(blog._id);
  };
  const handleWishlistClick = async () => {
    let revalue = await wishlistApi(blog._id);
    setwishlistSuccess(revalue)
  }
  const paragraphs = blog.description.split(/\n\s*\n/);

  return (
    <div className='container mt-5'>
      <h2 className='fw-bold'>{blog.title}</h2>
      <div className='d-flex justify-content-between p-5'>
        <div className='d-flex justify-content-between align-items-center '>
          <div>
            <i className="fa-solid fa-user fs-5"></i>
          </div>
          <div className='mx-3'>
            <span className='fw-bold fs-5 '>{blogUser}</span>
          </div>
        </div>
        <div>
          {likeSuccess ? (
            <i className="fa-solid fa-heart mx-3 fs-5" onClick={handleLikeClick}>{likeLength}</i>
          ) : (
            <i className="fa-regular fa-heart mx-3 fs-5" onClick={handleLikeClick}>{likeLength}</i>
          )}

          {wishlistSuccess ? (
            <i className="fa-solid fa-bookmark fs-5" onClick={handleWishlistClick}></i>
          ) : (
            <i className="fa-regular fa-bookmark fs-5" onClick={handleWishlistClick}></i>
          )}
        </div>
      </div>
      <img src={`/images/${blog.thumbnail}`} className='container' style={{ height: "40rem" }} alt="blog thumbnail" />
      {paragraphs.map((paragraph, index) => (
        <p className='fs-5' key={index}>
          {paragraph}
        </p>
      ))}
      <div className='my-3'></div>
      <Displaycomments blogId={blog._id} />
    </div>
  );
};

export default BlogDetails;

