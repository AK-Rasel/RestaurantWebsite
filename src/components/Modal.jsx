import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGit, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Modal = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { singUpWithGmail, login } = useContext(AuthContext);
  // redirection to home or specify page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handelEmailLogin = () => {
    singUpWithGmail()
      .then((result) => {
        const user = result.user;
        alert("login successfully");
        console.log(user);
        document.getElementById("my_modal_5").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    console.log(email, password);
    login(email, password)
      .then((result) => {
        const user = result.user;
        alert("login successfully");
        navigate(from, { replace: true });
        document.getElementById("my_modal_5").close();
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };
  return (
    <dialog id="my_modal_5" className="modal   modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action mt-0 flex flex-col justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body  p-0"
            method="dialog"
          >
            <h3 className="font-bold">Login Now!</h3>
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
            {errorMessage ? (
              <p className="text-red text-xs italic">{errorMessage}</p>
            ) : (
              ""
            )}
            {/* login button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn     bg-orange "
              />
            </div>

            {/* if there is a button in form, it will close the modal */}
            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <p className="text-center my-2 ">
              New here?{" "}
              <Link
                htmlFor="my_modal_5"
                onClick={() => document.getElementById("my_modal_5").close()}
                to="/signup"
                className="text-red hover:underline "
              >
                Create a New Account
              </Link>
            </p>
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
      </div>
    </dialog>
  );
};

export default Modal;
