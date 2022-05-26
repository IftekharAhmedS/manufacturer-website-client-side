import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L2pMqAzEnLuJbAznvK02AZoRb7uMJ1TteqcfG1eE2eFlcWy44fo63UN8DoGNMlp2YxwPTiBqVmt4bw4TTrqWz7t00bG457rQO"
);

const Payment = () => {
  const { id } = useParams();
  const { data: purchaseItem, isLoading } = useQuery(["purchase", id], () =>
    fetch(`https://manufacturer-site.herokuapp.com/purchase/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessKey")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center max-h-full">
        <button className="loading btn btn-square btn-xl mt-28"></button>
      </div>
    );
  }
  return (
    <div className="payment-container-card flex justify-center items-center align-middle">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm data={purchaseItem} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
