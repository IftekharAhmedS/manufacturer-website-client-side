import React from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

const AddNewParts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    fetch("http://localhost:5000/parts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessKey")}`,
      },
      body: JSON.stringify(data),
    });

    swal({
      title: "Part has been added",
      icon: "success",
      button: "Cool!",
    });
  };

  return (
    <div className="add-new-part-area">
      <div className="add-new-part-form flex w-full justify-center">
        <div className="add-new-part-form-body">
          <div className="add-new-part-title">
            <h1 className=" text-3xl font-[600] text-center my-4">
              Add a new part
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-md">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter part name"
                className="input input-bordered w-96 max-w-xs"
                {...register("name", {
                  required: true,
                })}
              />
              <p className="mt-2 text-red-500">
                {errors.name?.type === "required" && (
                  <span>Part name is required</span>
                )}
              </p>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Enter part description"
                className="textarea textarea-bordered w-96 max-w-xs"
                {...register("description", { required: true })}
              ></textarea>
              <p className="mt-2 text-red-500">
                {errors.description?.type === "required" && (
                  <span>Description is required</span>
                )}
              </p>
              <label className="label">
                <span className="label-text">Minimum order quantity</span>
              </label>
              <input
                type="number"
                placeholder="Minimum order quantity"
                className="input input-bordered w-96 max-w-xs"
                {...register("mOrderQuantity", {
                  required: true,
                })}
              />
              <p className="mt-2 text-red-500">
                {errors.mOrderQuantity?.type === "required" && (
                  <span>Minimum order quantity is required</span>
                )}
              </p>
              <label className="label">
                <span className="label-text">Available quantity</span>
              </label>
              <input
                type="number"
                placeholder="Available quantity"
                className="input input-bordered w-96 max-w-xs"
                {...register("availableQuantity", {
                  required: true,
                })}
              />
              <p className="mt-2 text-red-500">
                {errors.availableQuantity?.type === "required" && (
                  <span>Available quantity is required</span>
                )}
              </p>
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Price per unit"
                className="input input-bordered w-96 max-w-xs"
                {...register("price", {
                  required: true,
                })}
              />
              <p className="mt-2 text-red-500">
                {errors.price?.type === "required" && (
                  <span>Price is required</span>
                )}
              </p>
              <label className="label">
                <span className="label-text">Part image URL</span>
              </label>
              <input
                type="text"
                placeholder="Image URL"
                className="input input-bordered w-96 max-w-xs"
                {...register("url", {
                  required: true,
                })}
              />
              <p className="mt-2 text-red-500">
                {errors.url?.type === "required" && (
                  <span>Image URL is required</span>
                )}
              </p>
              <input
                className={`btn btn-accent my-4`}
                type="submit"
                value="Add Part"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewParts;
