import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
const Users = () => {
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      return res.json();
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>All Users</h5>
        <h5>Total Users:{users.length}</h5>
      </div>
      {/* table------start */}
      <div className="overflow-x-auto">
        <table className="table table-zebra md:w-[870px]">
          {/* head */}
          <thead className="bg-orange rounded-md">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((user, index) => (
              <tr key={users}>
                <th>{index + 1}</th>
                <td className="text-transform: capitalize">{user.name}</td>
                <td>{user.email}</td>
                <td className="text-transform: capitalize">
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button className="btn btn-sm btn-circle  bg-indigo-500 ">
                      <FaUsers className="text-xl text-white" />
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn btn-xs text-white hover:bg-orange hover:text-black bg-red p-">
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

export default Users;
