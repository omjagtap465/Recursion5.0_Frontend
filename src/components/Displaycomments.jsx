import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/displaycomments.css';


const Displaycomments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const location = useLocation();
  const userid = localStorage.getItem('userid');
  console.log(name)
  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const getComments = async (blogId) => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`http://localhost:3000/commentapi/comment/${blogId}`, {
        method: "GET",
        headers: {
          authorization: `bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
      }

      if (response.ok) {
        const fetchedComments = await response.json();
        setComments(fetchedComments);
        console.log(`Fetched comments: ${JSON.stringify(fetchedComments)}`);
      }
    } catch (error) {
      console.error('An error occurred during fetching comments:', error);
    }
  };



  const handleUpload = async (event) => {
    event.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:3000/commentapi/comment/${blogId}`, {
        method: "POST",
        body: JSON.stringify({ comment: comment }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
      }

      if (response.ok) {
        await response.json();
        await getComments(blogId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async (_id) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://localhost:3000/commentapi/deletecomment/${_id}`, {
        method: "POST",
        body: JSON.stringify({ userId: userid }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${accessToken}`
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
      }

      if (response.ok) {
        await response.json();
        await getComments(blogId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const asyncHandler = async () => {
      await getComments(blogId);

    }
    asyncHandler()
  }, []);

  return (
    <>
      <div className="comment-container">
        <div className="comment-title fs-3 fw-bold">Comments</div>
        <div className="comment-list">
          {comments.length > 0 && comments.map((element, index) => (
            <div key={index} className="comment">
              {console.log(element.comment)}
              <i></i>
              <div className="comment-avatar "> <i className="fa-solid fa-user fs-2"></i></div>
              <div className="comment-content d-flex justify-content-between">
                <div>
                  <p className='fs-6 fw-bold'>{element.userName}</p>
                  <p>
                    {element.comment}
                  </p>
                </div>

                {
                  userid === element.userId ?
                    <i className="fa-solid fa-trash" onClick={() => deleteComment(element._id)}></i> : " "
                }
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="add-comment">
        <input
          value={comment}
          type="text"
          name="comment"
          className="form-control"
          onChange={handleChange}
        />
        <button onClick={handleUpload}>Add</button>
      </div>
    </>
  );
};

export default Displaycomments;
