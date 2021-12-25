import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Payment = ({ amount, country }) => {
  const [spinner, setSpinner] = useState("");
  const history = useRouter();
  const paymentHandler = async (e) => {
    setSpinner(true);
    e.preventDefault();
    try {
      const response = await axios.get(`/api/order`);
      const { data } = await response;
      const options = {
        key: process.env.RAZORPAY_ID,
        name: "Anton Francis Jeejo",
        description: "Test Payment",
        order_id: data.id,
        handler: async (response) => {
          try {
            const config = {
              headers: {
                ContentType: "application/json",
              },
            };
            const temp = {
              amount: 1500,
              currency: "INR",
              order_id: data.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              createdAt: Date.now(),
            };
            await axios.post("/api/verify", temp, config);
            let redirect_url;
            if (
              typeof response.razorpay_payment_id == "undefined" ||
              response.razorpay_payment_id < 1
            ) {
              redirect_url = "/";
            } else {
              redirect_url = "/";
            }
            setSpinner(false);
            history.push(redirect_url);
          } catch (err) {
            setSpinner(false);
            history.push("/");
          }
        },
        theme: {
          color: "#528FF0",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      setSpinner(false);
      console.log(err);
    }
  };
  return (
    <div>
      <button className="courseRegister__button" onClick={paymentHandler}>
        {!spinner ? "Register" : <p>Loading...</p>}
      </button>
    </div>
  );
};

export default Payment;
