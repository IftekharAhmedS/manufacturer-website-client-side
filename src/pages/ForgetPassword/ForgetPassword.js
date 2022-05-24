import React from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import auth from "../../firebase.init";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { email } = data;
    await sendPasswordResetEmail(email);

    swal({
      title: "A password reset email has been sent",
      icon: "success",
      button: "Cool!",
    });
    navigate("/login");
  };

  return (
    <div className="resetPass-area">
      <div className="resetPass-form flex w-full justify-center">
        <div className="resetPass-form-body">
          <div className="resetPass-title">
            <h1 className=" text-3xl font-[600] text-center my-4">
              Reset your password
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-md">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Enter your email address"
                className="input input-bordered w-full max-w-xs"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                })}
              />
              <p className="mt-2 text-red-500">
                {errors.email?.type === "required" && (
                  <span>Email is required</span>
                )}
                {errors.email?.type === "pattern" && (
                  <span>Please enter a valid email</span>
                )}
              </p>
              <input
                className={`btn btn-accent my-4`}
                type="submit"
                value="reset password"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
