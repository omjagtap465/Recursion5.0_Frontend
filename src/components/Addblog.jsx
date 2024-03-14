import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postBlog } from '../redux/Blog-slices/Blog-data';
const Addblog = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    file: null,
    title: '',
    description: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData, [event.target.name]: event.target.files ? event.target.files[0] : event.target.value
    });
  };

  const handleUpload = () => {
    const formDataToSend = new FormData();
    formDataToSend.append('file', formData.file);
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description)
    dispatch(postBlog(formDataToSend));
    setFormData({
      file: null,
      title: '',
      description: '',
    })
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <label className="form-label">Upload Image</label>
        <input type="file" className="form-control" name="file" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input type="text" className="form-control" name="title" placeholder="Enter title" value={formData.title} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" name="description" placeholder="Enter description" value={formData.description} onChange={handleChange} />
      </div>
      <button className="btn btn-primary" onClick={handleUpload}>
        Upload Blog
      </button>
    </div>
  );
};

export default Addblog;

