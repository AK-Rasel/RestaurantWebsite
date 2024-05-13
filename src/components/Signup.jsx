import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  // google login
  const { singUpWithGmail, creteUser, updateUserProfile, loading } =
    useContext(AuthContext);
  const publicAxios = useAxiosPublic();
  // redirection to home or specify page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  // gmail login
  const handelEmailLogin = () => {
    singUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        publicAxios.post("/users", userInfo).then((res) => {});
        toast.success("login successfully");
        navigate(from, { replace: true });
        // console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // create user
  const onSubmit = (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const photoURL = data.photoURL;
    console.log(email, password);
    creteUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(name).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          publicAxios.post("/users", userInfo).then((res) => {});
          toast.success("sing successfully");
          navigate(from, { replace: true });
        });
      })
      .catch((err) => {
        toast.error("This didn't work.");
        const errorCode = err.code;
        const errorMessage = err.message;
        // toast.error(errorMessage);
        // alert(errorCode);
      });
  };

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
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>
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
            <input
              type="submit"
              value="Sign Up"
              className="btn     bg-orange "
            />
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
          <a
            href="/"
            title="Home"
            className="btn  text-red border border-red btn-sm btn-circle btn-ghost absolute right-10 top-10"
          >
            ✕
          </a>
        </form>
        {/* social*/}
        <div className="text-center space-x-4">
          <button className="btn btn-circle" onClick={handelEmailLogin}>
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
