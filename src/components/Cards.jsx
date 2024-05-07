/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
const Cards = ({ item, w96 }) => {
  const { image, category, name, price, recipe, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // like to heart
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  // carts function
  const handelCarts = () => {
    if (user && user.email) {
      const cartsItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };
      // console.log(cartsItem);
      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartsItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Item Cart Added",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login?",
        text: "Without an account can't able to add products",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SingUp Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div>
      <div
        className={`card h-[500px] ${w96} overflow-hidden my-5 bg-base-100 shadow-xl relative`}
      >
        {/* heard ----start */}
        <div
          className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-orange ${
            isHeartFilled ? "text-red" : "text-white"
          }`}
          onClick={handleHeartClick}
        >
          <FaHeart className="h-5 w-5 cursor-pointer" />
        </div>
        {/* heard ----End */}
        <Link to={`/menu/${_id}`}>
          <figure>
            <img
              className="hover:scale-105 transition-all duration-200 md:h-60"
              src={image}
              alt={name}
            />
          </figure>
        </Link>
        <div className="card-body">
          <Link to={`/menu/${_id}`} className="card-title">
            {name}
          </Link>
          <p>{recipe?.slice(0, 50)}...</p>
          <div className="card-actions justify-between items-center mt-2">
            <h5 className="font-semibold">
              <span className="text-red text-sm">$</span> {price}
            </h5>
            <button onClick={handelCarts} className="btn bg-orange ">
              Add Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
