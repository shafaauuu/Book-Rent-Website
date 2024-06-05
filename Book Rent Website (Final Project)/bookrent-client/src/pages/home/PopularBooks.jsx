import React, { useEffect, useState, useRef } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from '../../components/Cards';
import {} from "react-icons/fa6"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const SimpleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }} // Hide the arrow
      onClick={onClick}
    >
      Next
    </div>
  );
};

const SimplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }} // Hide the arrow
      onClick={onClick}
    >
      Back
    </div>
  );
};


const PopularBooks = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = useRef(null); // Use useRef to create a ref for the Slider component

  useEffect(() => {
    fetch("http://localhost:6001/menu")
      .then(res => res.json())
      .then(data => {
        const specials = data.filter((item) => item.rating > 4.8)
        setRecipes(specials)
      });

  }, []);

  // Settings for the Slider component
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <SimpleNextArrow />,
    prevArrow: <SimplePrevArrow />,
  };

  return (
    <div className='section-container my-20'>
      <div className='text-leaf'>
        <h2 className='title md:w-[520px] '> Popular Book  </h2>
      </div>
      


{/* arrow button */}
      <div>
        <button onClick={() => slider.current.slickPrev()} className='btn p-2 rounded-full ml-5'>
          <FaAngleLeft className='w-8 h-8 p-1'/>
        </button>
        <button onClick={() => slider.current.slickNext()} className='btn p-2 rounded-full ml-5 bg-blue'> 
        <FaAngleRight className='w-8 h-8 p-1'/>
        </button>
      </div>

      <Slider {...settings} ref={slider} className='overflow-hidden mt-10 space-x-5'>
        {recipes.map((item, i) => (
          <Cards key={i} item={item} />
        ))}
      </Slider>
    </div>
  )
}

export default PopularBooks;
