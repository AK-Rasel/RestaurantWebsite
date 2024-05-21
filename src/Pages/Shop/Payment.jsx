import React from "react";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../hooks/useCart";
import CheckoutForm from "./CheckoutForm ";

const stripePromise = loadStripe(import.meta.env.VITE_API_KEY_STRIPE);

const Payment = () => {
  const [cart, refetch] = useCart();
  // const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  // calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };
  // calculate Total Price
  const totalCartPrice = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);
  const totalPrice = parseFloat(totalCartPrice.toFixed(2));
  console.log(totalPrice);
  return (
    <div className="section-container my-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm price={totalPrice} cart={cart} refetch={refetch} />
      </Elements>
    </div>
  );
};

export default Payment;
