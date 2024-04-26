/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cards = ({ item }) => {
  const { image, category, name, price, recipe, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  return (
    <div>
      <div className="card w-96 my-5 bg-base-100 shadow-xl relative">
        <div
          className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-orange ${
            isHeartFilled ? "text-red" : "text-white"
          }`}
          onClick={handleHeartClick}
        >
          <FaHeart className="h-5 w-5 cursor-pointer" />
        </div>
        <Link to={`/menu/${_id}`}>
          <figure>
            <img
              className="hover:scale-105 transition-all duration-200 md:h-72"
              src={image}
              alt="Shoes"
            />
          </figure>
        </Link>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-between items-center mt-2">
            <h5 className="font-semibold">
              <span className="text-red text-sm">$</span> {price}
            </h5>
            <button className="btn bg-orange ">Add Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
