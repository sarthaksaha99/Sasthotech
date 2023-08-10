"use client";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiPencil } from "react-icons/hi";
import Swal from "sweetalert2";
type passwordUpdate = {
  password: string;
  oldPassword: string;
};
type DgUpdate = {
  name?: string;
  address?: string;
  logo?: string;
};
const AccountPage = () => {
  const [isDgUpdate, setDgUpdate] = useState(true);
  const { user } = useContext(AuthContext);
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<passwordUpdate>();
  const {
    register: register2,

    handleSubmit: handleSubmit2,

    formState: { errors: errors2 },
  } = useForm<DgUpdate>();
  const onSubmit: SubmitHandler<passwordUpdate> = async (data) => {
    console.log(data);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`,
        data,
        { withCredentials: true }
      );
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: `Password Updated Successfully`,
        confirmButtonText: "OK",
      });
    } catch (err: any) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error updating diagnostic info due to ${err.message}`,
        confirmButtonText: "Try Again",
      });
    }

    //  console.log(data);
  };
  const onSubmitDgUpdate: SubmitHandler<DgUpdate> = async (data) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`,
        data,
        { withCredentials: true }
      );
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: `${response?.data?.message}`,
        confirmButtonText: "OK",
      });
    } catch (err: any) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error updating diagnostic info due to ${err.message}`,
        confirmButtonText: "Try Again",
      });
    }

    setDgUpdate(!isDgUpdate);
    console.log(data);
  };
  //const [userInfo, setuserInfo] = useState({} as any);
  const [userInfo, setUserInfo] = useState({} as any);
  useEffect(() => {
    async function loadUserData() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`,
          { withCredentials: true }
        );
        console.log(response.data.data);
        const { address, division, logo, name } = response.data.data;
        const newObj = { address, division, logo, name };
        setUserInfo(response.data.data);
        // setUserInfo(response.data.data.users);
      } catch (err: any) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error loading user info due to ${err.message}`,
        });
      }
    }
    loadUserData();
  }, []);

  return (
    <div className="h-[100vh] bg-[#E9E7E7] flex flex-col ">
      <div className="w-[70%] px-3 py-2 my-5 mx-auto bg-white rounded-md">
        <h1 className="text-2xl font-semibold my-6">Account Settings</h1>

        <div>
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold">User Information</h1>
          </div>

          <div className="my-4 flex gap-10">
            <div className="w-32 h-32 text-center flex justify-center items-center rounded-full border-none" />
            <div className="grid w-[80%] grid-cols-2 gap-y-3 justify-between">
              <div>
                {" "}
                <p className="text-gray-400"> Name</p>
                {userInfo?.name}
              </div>
              <div>
                {" "}
                <p className="text-gray-400">Email</p>
                {userInfo?.email}
              </div>
              <div>
                {" "}
                <p className="text-gray-400">Role</p>
                {user.role}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between vlx">
            <h1 className="text-lg font-semibold">Passwords</h1>
          </div>

          <div className="my-4 flex flex-col items-center justify-center gap-10">
            <div>
              {" "}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-3">
                  <label htmlFor="password my-2">Old Password</label>
                  <input
                    type="password"
                    id="password"
                    className="inputStyle "
                    {...register("oldPassword", { required: true })}
                  />
                  {errors.oldPassword && (
                    <p className="text-red-600">Old Password is required</p>
                  )}
                </div>
                <label htmlFor="password my-2">New Password</label>
                <input
                  type="password"
                  id="password"
                  className="inputStyle "
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-600">New Password is required</p>
                )}

                <button className="btn my-4 bg-black">Update Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
