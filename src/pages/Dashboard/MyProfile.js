import React, { useEffect, useState } from "react";
import {
  useAuthState,
  useUpdateEmail,
  useUpdatePassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";

const MyProfile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [updateEmail, emailUpdating, emailError] = useUpdateEmail(auth);
  const [updateProfile, updating, profileError] = useUpdateProfile(auth);
  const [updatePassword, passUpdating, passError] = useUpdatePassword(auth);
  const [userAddress, setUserAddress] = useState({});
  const [userData, setUserData] = useState({});
  const [userPhone, setUserPhone] = useState({});
  const [userEducation, setUserEducation] = useState({});

  const email = user?.email;
  const url = `http://localhost:5000/users/${email}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(url, {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [url, userAddress, userEducation, userPhone]);

  const onSubmit = async (data) => {
    console.log(data);
    if (data.name !== "") {
      await updateProfile({ displayName: data?.name });
    }
    if (data.email !== "") {
      await updateEmail(data.email);
    }
    if (data.password !== "") {
      await updatePassword(data.password);
    }
    if (data.address !== "") {
      setUserAddress({ address: data.address });
    }
    if (data.phone !== "") {
      setUserPhone({ phone: data.phone });
    }
    if (data.education !== "") {
      setUserEducation({ education: data.education });
    }

    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
      });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-md ml-2">
          <h1 className=" text-xl font-medium mb-2">
            Username: {user.displayName}
          </h1>
          <input
            type="text"
            className="input input-bordered w-96 max-w-xs mb-3"
            placeholder="Update username"
            {...register("name", {})}
          />
          <h1 className=" text-xl font-medium mb-2">Email: {user.email}</h1>
          <input
            type="text"
            className="input input-bordered w-96 max-w-xs"
            placeholder="Update email"
            {...register("email", {})}
          />
          <input
            type="text"
            className="input input-bordered w-96 max-w-xs my-2"
            placeholder="Update password"
            {...register("password", {})}
          />
          <h1 className=" text-xl font-medium mb-2">
            Address: {userData?.address}
          </h1>
          <input
            type="text"
            className="input input-bordered w-96 max-w-xs"
            placeholder="Update address"
            {...register("address")}
          />
          <h1 className=" text-xl font-medium my-2">
            Education: {userData?.education}
          </h1>
          <input
            type="text"
            className="input input-bordered w-96 max-w-xs"
            placeholder="Update education"
            {...register("education", {})}
          />
          <h1 className=" text-xl font-medium my-2">
            Phone: {userData?.phone}
          </h1>
          <input
            type="number"
            className="input input-bordered w-96 max-w-xs"
            placeholder="Update phone"
            {...register("phone", {})}
          />

          <input
            className={`btn btn-accent my-4 w-80`}
            type="submit"
            value="Update profile"
          />
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
