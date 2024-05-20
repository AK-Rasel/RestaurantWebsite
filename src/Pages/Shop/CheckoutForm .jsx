/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { FaPaypal } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// eslint-disable-next-line react/prop-types
const CheckoutForm = ({ price, cart }) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  // console.log(price);
  useEffect(() => {
    if ((typeof price !== "number", price < 1)) {
      console.log(price, "price is not valid");
      return;
    }

    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || "anonymous",
              email: user?.email || "unknown",
            },
          },
        });

      if (confirmError) {
        // console.log(confirmError);
        setCardError(confirmError.message);
      } else {
        console.log(paymentIntent);
        alert("Payment successful!");
        if (paymentIntent.status === "succeeded") {
          setCardError(`Your transaction is ${paymentIntent.id}`);
        }
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      <div className="md:w-1/2 w-full space-y-3">
        <h1 className="text-lg font-semibold">Order Summary</h1>
        <p>Total Price : ${price}</p>
        <p>Number of Items: {cart.length}</p>
      </div>
      <div className="md:w-1/2 w-full space-y-5 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8">
        <h1 className="text-lg font-semibold">Process your Payment</h1>
        <h5 className="font-medium">Debit/Credit Card</h5>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="btn btn-sm w-full px-5 bg-orange"
          >
            Pay
          </button>
          {cardError && <p className="text-red">{cardError}</p>}
        </form>
        <hr />
        <button className="btn btn-sm btn-primary text-white">
          <FaPaypal /> Pay with Paypal
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
