import React, { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../components/Cards";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const simpleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
    >
      NEXT
    </div>
  );
};
const simplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
    >
      BACK
    </div>
  );
};

const SpecialDishes = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = useRef(null);
  useEffect(() => {
    fetch("http://localhost:5000/menu")
      .then((res) => res.json())
      .then((data) => {
        const specials = data?.filter((item) => item.category === "popular");
        setRecipes(specials);
      });
  }, []);
  // slider Setting
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
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
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
    nextArrow: <simpleNextArrow />,
    prevArrow: <simplePrevArrow />,
  };
  return (
    <div className="section-container my-20 relative ">
      {/* header */}
      <div>
        <p className="subtitle">Special Dishes</p>
        <h2 className="title md:w-[32rem]">Standout Dishes From Our Menu</h2>
      </div>
      {/* header ---end*/}

      {/* arrow btn----- */}
      <div className="md:absolute right-3 top-8 md:mr-24 ">
        <button
          onClick={() => slider?.current?.slickPrev()}
          className="btn p-2 rounded-full ml-5"
        >
          <FaAngleLeft className="w-8 h-8 p-1" />
        </button>
        <button
          onClick={() => slider?.current?.slickNext()}
          className="btn p-2 rounded-full ml-5 bg-orange"
        >
          <FaAngleRight className="w-8 h-8 p-1 " />
        </button>
        {/* arrow btn----- end */}
      </div>
      {/* slider---start */}
      <Slider
        ref={slider}
        {...settings}
        className="overflow-hidden  space-x-2 "
      >
        {recipes?.map((item, i) => (
          <Cards key={i} w96="w-96" item={item} />
        ))}
      </Slider>
      {/* slider---end */}
    </div>
  );
};

export default SpecialDishes;
