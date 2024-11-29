import React from 'react';
import Slider from 'react-slick'; // Import React Slick
import '../../assets/css/sectionCss/HomeSection01.css'; // Import custom styles if necessary
import { SliderImage } from '../../assets/handler/slider-images'; // Import the images

const HomeSection01 = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6, // You can adjust the number of slides to show
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="p-4">
            <div className="home-section">
                <h1>Movie Carousel Section</h1>
                <Slider {...settings}>
                    {SliderImage.map((image) => (
                        <div key={image.id} className="carousel-item">
                            <img
                                src={image.image} // Use the image URL
                                alt={`Movie ${image.id}`} // Provide a descriptive alt text
                                className="movie-image"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default HomeSection01;
