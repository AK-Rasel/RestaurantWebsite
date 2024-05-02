import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthProvider";

const Signup = () => {
  // google login
  const { singUpWithGmail, creteUser } = useContext(AuthContext);
  // redirection to home or specify page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handelEmailLogin = () => {
    singUpWithGmail()
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });
        console.log(user);
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
    const email = data.email;
    const password = data.password;
    console.log(email, password);
    creteUser(email, password)
      .then((result) => {
        const user = result.user;
        alert("sing successfully");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
              Sing Up
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
