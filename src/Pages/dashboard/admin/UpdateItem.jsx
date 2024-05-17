import React from "react";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import bgImage from "../../../../public/image/Add background/dark-surface-with-blank-space-fast-food-menu.jpg";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateItem = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { category, image, name, price, recipe, _id } = useLoaderData();
  const naivete = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const imageFile = data.image[0];
      if (!imageFile) {
        throw new Error("No image file provided");
      }

      // prepare FromData
      const formData = new FormData();
      formData.append("image", imageFile);

      // send the request
      const imageHosting = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (imageHosting.data.status) {
        const menuItem = {
          name: data.name,
          recipe: data.recipe,
          image: imageHosting.data.data.display_url,
          category: data.category,
          price: parseFloat(data.price),
        };

        const updateMenuItem = await axiosSecure.put(`/menu/${_id}`, menuItem);

        if (updateMenuItem.status) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Menu Item Update successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          naivete("/dashboard/menage-item");
        }
      }
    } catch (error) {
      console.error("Error uploading image or menu item:", error);
    }
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
                defaultValue={name}
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
                  defaultValue={category}
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
                  defaultValue={price}
                  {...register("price", { required: true })}
                  placeholder="Price"
                  className="input input-bordered w-full arrow-hide"
                />
              </div>
            </div>
            {/* Discretion */}
            <div>
              <label className="label">
                <span className="label-text">Recipe Details</span>
              </label>
              <textarea
                defaultValue={recipe}
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
