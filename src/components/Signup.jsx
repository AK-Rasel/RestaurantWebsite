import React from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="max-w-lg pb-10 mt-56 bg-white shadow w-full mx-auto flex items-center justify-center my-40">
      <div className="modal-action mt-0 flex flex-col justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body w-[400px]"
          method="dialog"
        >
          <h3 className="font-bold">Create a New Account</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password")}
              required
            />
            <label className="label mt-1">
              <a href="#" className="label-text-alt mt-2 link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          {/* error */}

          {/* login button */}
          <div className="form-control mt-6">
            <input type="submit" value="Login" className="btn     bg-orange " />
          </div>
          <p className="text-center my-2 ">
            Have an account?
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="text-red hover:underline "
            >
              Login
            </button>
          </p>
          {/* if there is a button in form, it will close the modal */}
          <Link
            to="/"
            title="Home"
            className="btn  text-red border border-red btn-sm btn-circle btn-ghost absolute right-10 top-10"
          >
            ✕
          </Link>
        </form>
        {/* social*/}
        <div className="text-center space-x-4">
          <button className="btn btn-circle">
            <FaGoogle />
          </button>
          <button className="btn btn-circle">
            <FaFacebook />
          </button>
          <button className="btn btn-circle">
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Signup;
