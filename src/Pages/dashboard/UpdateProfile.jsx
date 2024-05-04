import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { updateUserProfile } = useContext(AuthContext);
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
  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;
    console.log(name, photoURL);
    console.log(name, photoURL);
    updateUserProfile(name, photoURL)
      .then(() => {
        toast.success("Update profile successfully done");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h3>Update Your Profile</h3>
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
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              type="text"
              placeholder="photoURL"
              className="input input-bordered"
              {...register("photoURL")}
            />
            {/* toDo after  ❤😊😊*/}
            {/* <input type="file" className="file-input w-full max-w-xs" /> */}
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-orange">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
