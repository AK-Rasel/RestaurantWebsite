import React from "react";
import bannerImage from "../../public/image/banner.png";
import image13 from "../../public/image/image 13.png";
import image14 from "../../public/image/image 14.png";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100% m-0">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
        {/* image */}
        <div className="md:w-1/2">
          <img src={bannerImage} alt="Banner Image" />
          {/* card div */}
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
            {/* card first */}
            <div className="bg-white flex py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64">
              <img src={image13} alt="" className="rounded-2xl" />
              <div className="space-y-1">
                <h5 className="font-medium">Spicy noodles</h5>
                {/* rating */}
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                </div>
                <p>
                  <span className="text-red">$</span>18.00
                </p>
              </div>
            </div>
            {/* card second */}
            <div className="bg-white sm:flex hidden py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64">
              <img src={image14} alt="" className="rounded-2xl" />
              <div className="space-y-1">
                <h5 className="font-medium">Spicy noodles</h5>
                {/* rating */}
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                  />
                </div>
                <p>
                  <span className="text-red">$</span>18.00
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* text */}
        <div className="md:w-1/2 space-y-7 px-4">
          <h2 className="md:text-5xl text-4xl font-bold leading-snug">
            Dive into Delights Of Delectable{" "}
            <span className="text-orange">Food</span>
          </h2>
          <p className="text-xl text-[#4A4A4A] ">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>
          <button className="btn rounded-full px-4 hover:bg-transparent hover:border-orange  bg-orange">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
