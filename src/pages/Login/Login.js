import React, { useEffect } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    await signInWithEmailAndPassword(email, password);
  };

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user || gUser) {
      navigate("/");
    }
  }, [navigate, user, gUser]);

  if (loading || gLoading) {
    return (
      <div className="flex justify-center items-center max-h-full">
        <button className="loading btn btn-square btn-xl mt-28"></button>
      </div>
    );
  }
  return (
    <div className="register-area">
      <div className="register-form flex w-full justify-center">
        <div className="register-form-body">
          <div className="register-title">
            <h1 className=" text-3xl font-[600] text-center my-4">
              Log into your account
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
                className={`btn btn-accent my-4`}
                type="submit"
                value="Sign In"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="divider max-w-lg mx-auto">OR</div>
      <div className="google-reg text-center">
        <button className="btn btn-primary" onClick={() => signInWithGoogle()}>
          Continue with google
        </button>
      </div>
    </div>
  );
};

export default Login;
