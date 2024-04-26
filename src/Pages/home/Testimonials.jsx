/* eslint-disable react/no-unescaped-entities */
import React from "react";
import testimonials_1 from "../.../../../../public/image/Testimonials/Testimonials-1.png";
import testimonials_2 from "../.../../../../public/image/Testimonials/Testimonials-2.png";
import testimonials_3 from "../.../../../../public/image/Testimonials/Testimonials-3.png";
import testimonials_4 from "../.../../../../public/image/Testimonials/Testimonials-4.png";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <img src={testimonials_1} alt="Chef Image" />
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:4/5">
            {/* header */}
            <p className="subtitle">Testimonials</p>
            <h2 className="title ">What Our Customers Say About Us</h2>
            {/* header ---end*/}
            <blockquote className="my-5 text-secondary leading-[30px]">
              “I had the pleasure of dining at FoodY last night, and I'm still
              raving about the experience! The attention to detail in
              presentation and service was impeccable”
            </blockquote>

            {/* Avatar */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12">
                    <img src={testimonials_2} />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src={testimonials_3} />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src={testimonials_4} />
                  </div>
                </div>
              </div>
              {/* customer reviews */}
              <div className="space-y-1">
                <h5 className="text-lg font-semibold">Customer Feedback</h5>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="font-medium">4.9</span>{" "}
                  <span className="text-[#807E7E]">(18.6k Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
