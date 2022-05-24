import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import auth from "../../firebase.init";

const PurchasePart = () => {
  const [user, loading, error] = useAuthState(auth);
  const navivgate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await fetch("http://localhost:5000/purchase/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessKey")}`,
      },
      body: JSON.stringify({ ...data, partName: name, partPrice: price * data.minimum , status: "unpaid" }),
    });
    
    swal({
      title: "Order has been placed!",
      icon: "success",
      button: "Cool!",
    });
    navivgate('/dashboard')
  };
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
    <div className="purchase-container">
      <div className="flex flex-col items-center w-full container mx-auto">
        <div className="card lg:card-side w-6/12 bg-base-100 shadow-xl mb-6">
          <figure className="">
            <img src={url} alt="parts" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>{`${description}`}</p>
            <p className="font-semibold text-xl">${price}</p>
            <p className="font-semibold">
              Minimum order quantity: {mOrderQuantity} piece
            </p>
            <p className="font-semibold">
              Available: {availableQuantity} piece
            </p>
          </div>
        </div>
        <div className="card w-6/12 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center text-2xl">Order: {name}</h2>
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
                  <span className="label-text">Your Address</span>
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
                    },
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
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter phone number"
                  className="input input-bordered w-full max-w-xs"
                  {...register("phone", {
                    required: true,
                  })}
                />
                <p className="mt-2 text-red-500">
                  {errors.phone?.type === "required" && (
                    <span>Phone number is required</span>
                  )}
                </p>
              </div>
              <div className="card-actions justify-end">
                <input
                  className={`btn btn-primary my-4 ${
                    errors.minimum?.type === "max" && "btn-disabled"
                  } ${errors.minimum?.type === "min" && "btn-disabled"}`}
                  type="submit"
                  value="Place order"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePart;
