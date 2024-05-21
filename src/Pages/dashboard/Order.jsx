import bgImage from "../../../public/image/Add background/dark-surface-with-blank-space-fast-food-menu.jpg";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
const Order = () => {
  // gate orders
  const { user } = useAuth();
  const token = localStorage.getItem("Token");
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/payment?email=${user?.email}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  console.log(orders);
  const fromData = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };
  return (
    <div className="section-container">
      {" "}
      {/* Banner image */}
      <div
        className=" hero min-h-[30vh] w-full mt-20 mb-5"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <h2 className=" lg:text-4xl text-white font-semibold my-4">
          Track All Your
          <span className="script-font text-5xl text-orange"> Orders! </span>
          <span>Items</span>
        </h2>
      </div>
      {/* Banner image ---end*/}
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-orange text-black">
            <tr>
              <th></th>
              <th>Order Date</th>
              <th>TransitionId</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {orders?.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>{fromData(order.createdAt)}</td>
                <td>{order.transactionId}</td>
                <td>{"$" + order.price}</td>
                <td>{order.status}</td>
                <td>Contact</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
