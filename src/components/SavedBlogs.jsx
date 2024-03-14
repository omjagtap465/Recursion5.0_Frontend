import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const SavedBlogs = () => {
    const [displayWishlistedBlogs, setdisplayWishlistedBlogs] = useState(null)
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const wishlListedBlogs = async () => {
        try {
            const response = await fetch(`http://localhost:3000/blogsapi/wishlistedblogs`, {
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
                return result
            }
        } catch (error) {
            console.log('An error occurred during likes:', error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            let revalue = await wishlListedBlogs()
            setdisplayWishlistedBlogs(revalue)
        };
        fetchData();
    }, []);
    const handleClick = (blog) => {
        navigate(`/blog/${blog._id}`, { state: blog });
    };
    const roles = localStorage.getItem('roles');

    return (
        <div className='mt-4' >
            <div className='container'>
                <h2>Posts you saved...</h2>
            </div>
            <div className='d-flex  justify-content-centermx-2 mt-3' style={{ flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                {displayWishlistedBlogs && displayWishlistedBlogs.length > 0 ? (
                    displayWishlistedBlogs.map((blog, index) => (
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
        </div>
    )
}
export default SavedBlogs;
