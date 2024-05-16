import React from "react";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import bgImage from "../../../../public/image/Add background/dark-surface-with-blank-space-fast-food-menu.jpg";
const UpdateItem = () => {
  const { category, image, name, price, recipe, _id } = useLoaderData();
  //   const { category, image, name, price, recipe, _id } = menuItem;
  console.log(name);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      {/* Banner image */}
      <div
        className=" hero min-h-[30vh] w-full md:w-[56vw] xl:w-[85vw] lg:w-[70vw] "
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <h2 className=" lg:text-4xl text-white font-semibold my-4">
          Update
          <span className="script-font text-5xl text-orange"> A </span>
          <span>Menu Item</span>
        </h2>
      </div>
      {/* Banner image ---end*/}
      <div className="flex justify-center items-center   my-10">
        <div className="card shrink-0 w-full max-w-4xl ">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* recipe */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Recipe Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Recipe Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="flex justify-between items-center gap-5 lg:flex-row flex-col">
              {/* category */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  defaultValue="default"
                  {...register("category", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option disabled value="default">
                    Select a Category
                  </option>
                  <option value={"salad"}>Salad</option>
                  <option value={"dessert"}>Dessert </option>
                  <option value={"pizza"}>Pizza</option>
                  <option value={"soup"}>Soup</option>
                  <option value={"drinks"}>Drinks</option>
                  <option value={"popular"}>Popular</option>
                </select>
              </div>
              {/* Price */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  {...register("price", { required: true })}
                  placeholder="Price"
                  className="input input-bordered w-full "
                />
              </div>
            </div>
            {/* Discretion */}
            <div>
              <label className="label">
                <span className="label-text">Recipe Details</span>
              </label>
              <textarea
                {...register("recipe", { required: true })}
                className="textarea textarea-bordered w-full"
                placeholder="Bio"
              ></textarea>
            </div>
            {/* file input */}
            <div>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input w-full max-w-xs"
              />
            </div>
            <div className="flex justify-center items-center">
              <div className=" mt-6">
                <button type="submit" className="btn     bg-orange ">
                  {" "}
                  Add Item <FaUtensils />{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
