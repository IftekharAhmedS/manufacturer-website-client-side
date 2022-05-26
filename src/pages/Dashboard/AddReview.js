import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import auth from "../../firebase.init";

const AddReview = () => {
  const [user, loading, error] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navivgate = useNavigate();

  const onSubmit = async (data) => {
    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessKey")}`,
      },
      body: JSON.stringify(data),
    });

    swal({
      title: "Thanks for the review",
      icon: "success",
      button: "Okay!",
    });
    navivgate("/");
  };

  return (
    <div className="add-new-review-area">
      <div className="add-new-review-form flex w-full justify-center">
        <div className="add-new-review-form-body">
          <div className="add-new-review-title">
            <h1 className=" text-3xl font-[600] text-center my-4">
              Add a Review
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-md">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                value={user.displayName}
                readOnly
                className="input input-bordered w-96 max-w-xs"
                {...register("name", {
                  required: true,
                })}
              />
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Write a review"
                className="textarea textarea-bordered w-96 max-w-xs"
                {...register("description", { required: true })}
              ></textarea>
              <p className="mt-2 text-red-500">
                {errors.description?.type === "required" && (
                  <span>Review is required</span>
                )}
              </p>
              <label className="label">
                <span className="label-text">Rating</span>
              </label>
              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  value="1"
                  {...register("rating", { required: true })}
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  value="2"
                  {...register("rating", { required: true })}
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  value="3"
                  {...register("rating", { required: true })}
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  value="4"
                  {...register("rating", { required: true })}
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  value="5"
                  {...register("rating", { required: true })}
                  className="mask mask-star-2 bg-orange-400"
                />
              </div>
              <p className="mt-2 text-red-500">
                {errors.rating?.type === "required" && (
                  <span>Rating is required</span>
                )}
              </p>
              <input
                className={`btn btn-accent my-4`}
                type="submit"
                value="Post review"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
