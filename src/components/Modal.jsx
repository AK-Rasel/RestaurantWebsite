import React from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGit, FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Modal = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <dialog id="my_modal_5" className="modal  modal-middle">
      <div className="modal-box">
        <div className="modal-action mt-0 flex flex-col justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
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
            <div className="form-control space-y-2">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password")}
              />
              <label className="label">
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
                value="Login"
                className="btn   hover:bg-transparent hover:border-orange  bg-orange "
              />
            </div>
            <p className="text-center mt-4">
              New here?{" "}
              <Link to="/signup" className="text-red hover:underline ">
                Create a New Account
              </Link>
            </p>
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
      </div>
    </dialog>
  );
};

export default Modal;
