import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import auth from "../../firebase.init";

const stripePromise = loadStripe('pk_test_51L2pMqAzEnLuJbAznvK02AZoRb7uMJ1TteqcfG1eE2eFlcWy44fo63UN8DoGNMlp2YxwPTiBqVmt4bw4TTrqWz7t00bG457rQO');


const PurchasePart = () => {
  const [user, loading, error] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const { id } = useParams();
  const [partsInfo, setPartsInfo] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      const { data } = await axios.get(`http://localhost:5000/parts/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessKey")}`,
        },
      });
      setPartsInfo(data);
    };
    getItems();
  }, [id]);
  const {
    _id,
    name,
    description,
    mOrderQuantity,
    availableQuantity,
    price,
    url,
  } = partsInfo;
  return (
    <div className="flex w-full container mx-auto">
      <div className="card w-6/12 bg-base-100 shadow-xl">
        <figure className="px-36">
          <img src={url} alt="parts" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{`${description}`}</p>
          <p className="font-semibold text-xl">${price}</p>
          <p className="font-semibold">
            Minimum order quantity: {mOrderQuantity} piece
          </p>
          <p className="font-semibold">Available: {availableQuantity} piece</p>
        </div>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="card w-6/12 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl">Purchase: {name}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-md">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                readOnly
                value={user?.displayName}
                {...register("name")}
              />
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                readOnly
                value={user?.email}
                {...register("email")}
              />
              <label className="label">
                <span className="label-text">Your Adress</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                {...register("address", { required: true })}
              ></textarea>
              <p className="mt-2 text-red-500">
                {errors.address?.type === "required" && (
                  <span>Address is required</span>
                )}
              </p>
              <label className="label">
                <span className="label-text">Purchase amount</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                {...register("minimum", {
                  required: true,
                  min: {
                    value: mOrderQuantity,
                  },
                  max: {
                    value: availableQuantity,
                  }
                })}
              />
              <p className="mt-2 text-red-500">
                {errors.minimum?.type === "required" && (
                  <span>Minimum order amount is required</span>
                )}
                {errors.minimum?.type === "min" && (
                  <span>You cannot go below minimum order amount</span>
                )}
                {errors.minimum?.type === "max" && (
                  <span>You cannot go higher than available parts</span>
                )}
              </p>
            </div>
            <div className="card-actions justify-end">
              <input
                className={`btn btn-primary my-4 ${errors.minimum?.type === "max" && 'btn-disabled'
                } ${errors.minimum?.type === "min" && 'btn-disabled'
              }`}
                type="submit"
                value="Pay now"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchasePart;
