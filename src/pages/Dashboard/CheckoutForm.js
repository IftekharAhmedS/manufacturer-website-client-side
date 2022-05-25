import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const CheckoutForm = ({ data }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const navigate = useNavigate();

    const { _id, partPrice } = data;
  useEffect(() => {

    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessKey")}`,
      },
      body: JSON.stringify({ partPrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [data, partPrice]);

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
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: data.name,
            email: data.email,
          },
        },
      });
      if(intentError){
        setCardError(intentError.message)
      }
      else{
        console.log(paymentIntent)
        swal({
          title: "Payment Successful!",
          icon: "success",
          button: "Cool!",
        })

        const payment = {
          purchase: _id,
          transactionId: paymentIntent.id,
        }

        fetch(`http://localhost:5000/purchase/${_id}`, {
          method: "PATCH",
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem("accessKey")}`,
          },
          body: JSON.stringify(payment)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })

        navigate('/dashboard')


      }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        className="btn btn-secondary btn-sm mt-5"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p>{cardError}</p>
    </form>
  );
};

export default CheckoutForm;
