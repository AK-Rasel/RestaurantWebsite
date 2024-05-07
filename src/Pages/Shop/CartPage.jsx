import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  // calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };
  // calculate Total Price
  const totalCartPrice = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);
  const orderPrice = totalCartPrice;
  // Increase function
  const handleIncrease = (item) => {
    fetch(`http://localhost:5000/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems?.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          refetch();
          return cartItem;
        });
        setCartItems(updatedCart);
        refetch();
        console.log(data);
      });
    refetch();
  };

  // Decrease function
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:5000/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCart = cartItems?.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }

            return cartItem;
          });
          setCartItems(updatedCart);
          refetch();
          // console.log(data);
        });
    }
  };

  // delete function
  const handleDelete = (item) => {
    console.log(item._id);
    // console.log(item);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your Cart Product has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };
  return (
    <div className="section-container ">
      {/* banner -----start */}
      <div className="py-40 flex flex-col justify-between items-center text-center">
        {/* text */}
        <div className=" space-y-7 px-4">
          <h2 className="md:text-5xl text-4xl font-bold leading-snug">
            Items Added to The
            <span className="text-orange"> Cart</span>
          </h2>
        </div>
      </div>
      {/* banner -----end */}

      {/* table for cart-----start */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-orange text-black">
              <tr>
                <th>
                  {/* <label>
                    <input type="checkbox" className="checkbox" />
                  </label> */}
                  #
                </th>
                <th>Food</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {cart.map((item, index) => (
                <tr key={item._id}>
                  <th>
                    <label>
                      {/* <input type="checkbox" className="checkbox" /> */}
                      {index + 1}
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item?.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{item?.name}</td>
                  {/* quantity  */}
                  <td>
                    {/* Decrease dtn */}
                    <button
                      onClick={() => handleDecrease(item)}
                      className="btn btn-xs"
                    >
                      -
                    </button>
                    <input
                      className="w-10 mx-2 text-center overflow-hidden[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      value={item.quantity}
                      onChange={() => console.log(item.quantity)}
                    />
                    {/* Increase  dtn */}
                    <button
                      onClick={() => handleIncrease(item)}
                      className="btn btn-xs"
                    >
                      +
                    </button>
                  </td>
                  <td>$ {calculatePrice(item).toFixed(2)}</td>
                  <th>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn text-red btn-ghost btn-xs"
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
      {/* table for cart-----end */}

      {/* Customer details */}
      <div className=" my-12 flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium"> Customer Details</h3>
          <p>Name : {user?.displayName}</p>
          <p>Email : {user?.email}</p>
          <p>User id : {user?.uid}</p>
        </div>
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium"> Shopping Details</h3>
          <p>Total Item: {cart.length}</p>
          <p>Total Price: ${orderPrice.toFixed(2)}</p>
          <button className="btn bg-orange ">Proceed CheckOut</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
