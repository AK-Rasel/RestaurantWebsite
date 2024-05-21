import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import bgImage from "../../../../public/image/Add background/MenageBanner.jpg";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const MenageBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payment/all");
      return res.data;
    },
  });
  //   console.log(orders);
  const deletedHandle = async (order) => {
    await axiosSecure.delete(`/payment/all/${order?._id}`).then((res) => {
      //   console.log(res.data);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "SuccessFully delete order",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    });
  };
  const confirmHandle = async (order) => {
    await axiosSecure.patch(`/payment/all/${order?._id}`).then((res) => {
      console.log(res.data);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Order Confirmed Done",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    });
  };
  return (
    <div>
      {/* Banner image */}
      <div
        className=" hero min-h-[30vh] mb-5  md:w-[56vw] xl:w-[85vw] lg:w-[70vw] "
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <h2 className=" lg:text-4xl text-white font-semibold my-4">
          Menage
          <span className="script-font text-5xl text-orange"> All </span>
          <span>Bookings</span>
        </h2>
      </div>
      {/* Banner image ---end*/}
      {/* table------start */}
      <div className="overflow-x-auto md:flex justify-center items-center">
        <table className="table table-zebra  xl:table-md table-xs  ">
          {/* head */}
          <thead className="bg-orange rounded-md text-black">
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th className="hidden lg:block">Transition Id</th>
              <th>Price</th>
              <th>Status</th>
              <th>Confirm Order</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {orders?.map((order, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{order.email}</td>
                <td className="hidden lg:block">{order.transactionId}</td>
                <td>{"$" + order.price}</td>
                <td>{order.status}</td>

                <td className="text-center">
                  {order.status === "confirmed" ? (
                    "done"
                  ) : (
                    <button
                      onClick={() => confirmHandle(order)}
                      className="btn btn-xs bg-green-500 text-white"
                    >
                      <GiConfirmed />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => deletedHandle(order)}
                    className="btn btn-xs text-white hover:bg-orange hover:text-black bg-red p-"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* table-----end */}
    </div>
  );
};

export default MenageBookings;
