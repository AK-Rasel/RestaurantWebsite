import React from "react";
import useMenu from "../../../hooks/useMenu";
import bgImage from "../../../../public/image/Add background/dark-surface-with-blank-space-fast-food-menu.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MenageItems = () => {
  const [menu, isLoading, refetch] = useMenu();
  // console.log(menu);
  const axiosSecure = useAxiosSecure();
  const menuDeleteHandel = (menuItem) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/menu/${menuItem._id}`);
          if (res.status === 200) {
            refetch(); // This should work correctly
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Menu item deleted successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (error) {
          console.error("Error deleting menu item:", error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Failed to delete menu item",
            showConfirmButton: true,
          });
        }
      }
    });
  };
  return (
    <div>
      {" "}
      {/* Banner image */}
      <div
        className=" hero min-h-[30vh] w-full md:w-[53vw] xl:w-[85vw] lg:w-[70vw] "
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <h2 className=" lg:text-4xl text-white font-semibold my-4">
          Manage
          <span className="script-font text-6xl text-orange"> All </span>
          <span>Menu Items</span>
        </h2>
      </div>
      {/* Banner image ---end*/}
      {/* Table --------------start */}
      <div className="max-w-screen-xl mx-auto">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {menu?.map((menuItem, index) => (
                <tr key={menuItem._id}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={menuItem.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>{menuItem.name}</td>
                  <td>{"$" + menuItem.price}</td>
                  <th>
                    <Link
                      to={`/dashboard/update-menu/${menuItem._id}`}
                      className="btn bg-orange text-xl"
                    >
                      <FaEdit />
                    </Link>
                  </th>
                  <th>
                    <button
                      onClick={() => menuDeleteHandel(menuItem)}
                      className="btn bg-red text-lg text-white "
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Table --------------end */}
    </div>
  );
};

export default MenageItems;
