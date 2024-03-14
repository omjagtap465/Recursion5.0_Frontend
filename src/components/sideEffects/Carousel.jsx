import React from 'react';
const Carousel = () => {
    const Carousel_Css = { height: "42rem", objectFit: "cover" }
    return (
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="/images/carousel.jpg" className="d-block w-100" alt="..." style={Carousel_Css} />
                    <div className="carousel-caption d-none d-md-block">
                        <h1 className='text-black fw-bold'>Discover Expert Insights</h1>
                        <p className='text-black'>A collection of motivating and captivating narratives that readers can explore..</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="/images/images.jpg" className="d-block w-100" alt="..." style={Carousel_Css} />
                    <div className="carousel-caption d-none d-md-block">
                        <h1 className='text-black fw-bold'>Discover Expert Insights</h1>
                        <p className='text-black'>x\Blog offers valuable knowledge and expertise on specific topics, encouraging users to delve deeper into the content.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="/images/Carousel2.jpg" className="d-block w-100" alt="..." style={Carousel_Css} />
                    <div className="carousel-caption d-none d-md-block ">
                        <h1 className='text-black fw-bold'>Find Your Next Adventure</h1>
                        <p className='text-black'>Blog features content related to travel, exploration, or new experiences, inviting users to discover exciting adventures through the blog's posts.</p>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>

    );
}

export default Carousel;
