import React from "react";
import testimonials_1 from "../.../../../../public/image/Testimonials/Testimonials-1.png";
const serviceList = [
  {
    id: 1,
    title: "Catering",
    des: "Delight your guests with our flavors and  presentation",
    image: "../../../public/image/OurServices/fi-rr-salad.png",
  },
  {
    id: 2,
    title: "Fast delivery",
    des: "We deliver your order promptly to your door",
    image: "../../../public/image/OurServices/fi-rr-time-fast.png",
  },
  {
    id: 3,
    title: "Online Ordering",
    des: "Explore menu & order with ease using our Online Ordering ",
    image: "../../../public/image/OurServices/fi-rr-shopping-cart-check.png",
  },
  {
    id: 4,
    title: "Online Ordering",
    des: "Explore menu & order with ease using our Online Ordering ",
    image: "../../../public/image/OurServices/fi-rr-gift.png",
  },
];
export const OurServices = () => {
  return (
    <div className="section-container py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* text----start */}
        <div className="md:w-1/2">
          <div className="text-left md:4/5">
            {/* header */}
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title ">Our Culinary Journey And Services</h2>
            {/* header ---end*/}
            <p className="my-5 text-secondary leading-[30px]">
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with warm
              hospitality.
            </p>
            <button className="btn rounded-full py-3 px-8 bg-orange">
              Explore
            </button>
          </div>
          {/* text----end */}
        </div>
        <div className="md:w-1/2">
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-8 items-center">
            {serviceList?.map((services) => (
              <div
                key={services.id}
                className="shadow-md rounded-sm py-5 px-4 text-center space-y-2
              text-orange cursor-pointer
              hover:border-orange transition-all duration-200 hover:border"
              >
                <img
                  src={services.image}
                  alt={services.title}
                  className="mx-auto"
                />
                <h5 className="pt-3 font-semibold">{services.title}</h5>
                <p className="text-[#d4c578]">{services.des}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
