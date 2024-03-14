import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'; 
import { postComment } from '../redux/Comment-slices/Comment-data';
const Addcomment = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [comment, setcomment] = useState("");

  const handleChange = (event) => {
    setcomment(event.target.value);
  };

  const handleUpload = (event) => {
    event.preventDefault();
  const blog = location.state;
    dispatch(postComment(blog._id, comment));
    setcomment("")
  };

  return (
    <form onSubmit={handleUpload} className="container">
      <div className="mb-3">
        <label className="form-label">Add Comment</label>
        <input
          value={comment}
          type="text"
          name="comment"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="my-2 btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Addcomment;


