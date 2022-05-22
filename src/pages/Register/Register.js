import React from "react";
import { useForm } from "react-hook-form";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateProfileError] = useUpdateProfile(auth);

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: username });
    
  };
if(user){
    console.log(user)
}

  return (
    <div className="register-area">
      <div className="register-form flex w-full justify-center">
        <div className="register-form-body">
          <div className="register-title">
            <h1 className=" text-3xl font-[600] text-center my-4">
              Register an account
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-md">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="input input-bordered w-96 max-w-xs"
                {...register("username", { required: true })}
              />
              <p className="mt-2 text-red-500">
                {errors.username && <span>Username is required</span>}
              </p>
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
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter a password"
                className="input input-bordered w-full max-w-xs"
                {...register("password", { required: true, minLength: 6 })}
              />
              <p className="mt-2 text-red-500">
                {errors.password?.type === "required" && (
                  <span>Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span>Password must be at least 6 characters</span>
                )}
              </p>
              <input
                className="btn btn-accent my-4"
                type="submit"
                value="Create an account"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="divider max-w-lg mx-auto">OR</div>
      <div className="google-reg text-center">
        <button className="btn btn-primary">Continue with google</button>
      </div>
    </div>
  );
};

export default Register;
