import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
const SearchedBlogs = () => {
    const [displayBlogs, setdisplayBlogs] = useState(null)
    const { search } = useParams();
    const searchBlogs = async (search) => {
        try {
            console.log(search);
            const response = await fetch(`http://localhost:3000/blogsapi/searchblogs/${search}`);
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData)
            }

            if (response.ok) {
                let res = await response.json();
                setdisplayBlogs(res)
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            await searchBlogs(search)
        };
        fetchData();
        console.log(displayBlogs)
    }, []);
    const handleClick = (blog) => {
        navigate(`/blog/${blog._id}`, { state: blog });
    };
    return (
        <div className='mt-4' >
            <div className='container'>
                <h2>Searched result...</h2>
            </div>
            <div className='d-flex  justify-content-centermx-2 mt-3' style={{ flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                {displayBlogs && displayBlogs.length > 0 ? (
                    displayBlogs.map((blog, index) => (
                        <div key={index} className="card mx-4 my-3 " style={{ width: '28rem', height: "30rem", cursor: "pointer" }}>
                            <div className='position-relative  border' onClick={() => handleClick(blog)}>
                                <img src={`../images/${blog.thumbnail}`} className="card-img-top" style={{ "height": "16rem" }} alt={blog.title} />
                            </div>
                            <div className="card-body d-flex justify-content-between">
                                <div onClick={() => handleClick(blog)}>
                                    <h2 className="card-title">{blog.title.substring(0, 20)}  </h2>
                                    <p className="card-text fs-5">{blog.description.substring(0, 120)}...</p>
                                </div>
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
export default SearchedBlogs;
