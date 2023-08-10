"use client";

import React, { useContext, useState } from "react";
import styles from "./../styles/styles.module.css";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { useFormData } from "@/context/formcontext";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext, AuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { IDiagnostic, IUser } from "@/Types/types.auth";
import { IDoctorItem2 } from "@/Types/types.doctor";

type Inputs = {
  email: string;
  password: string;
  website: string;
  avatar_url: string;
};
const LoginPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { setFormValues } = useFormData();
  const { login, setDiagnosticInfo } = useContext(AuthContext);
  const router = useRouter();
  const [show, setShow] = useState(true);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,

        data,
        {
          withCredentials: true,
        }
      );

      //  console.log(response.data);
      //
      await Swal.fire({
        title: "Success!",
        text: `${response?.data?.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      const userData = response?.data?.data;
      //console.log(role);
      const response1 = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor`,

        {
          withCredentials: true,
        }
      );
      const allDoctors: IDoctorItem2[] = response1?.data?.data?.items;
      //  console.log(allDoctors);
      let diagnosticInfo: IDiagnostic;
      if (userData.role !== "superadmin") {
        const response3 = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/diagnostic`,

          {
            withCredentials: true,
          }
        );
        const { id, name, division, logo, address } = response3?.data?.data;
        diagnosticInfo = { id, name, division, logo, address };
        console.log(diagnosticInfo);

        setDiagnosticInfo(diagnosticInfo);
        //console.log(diagnosticeInfo);
      }
      login(userData as IUser, allDoctors);

      if (userData.role === "superadmin") router.push("/superadmin");
      else if (userData.role === "admin") router.push("/diagnostic");
      else router.push("/");
      // Check if the "token" cookie exists
    } catch (err) {
      //console.log(err.message);
      await Swal.fire({
        title: "Error!",
        text: ` Either Email or Password is Wrong`,
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "black",
      });
    }
    // console.log(data);
  };
  return (
    <div className="bg-[#E9E7E7]  w-full h-[100vh] flex justify-center items-center">
      <div className="mx-auto rounded-lg border-[2px] border-[#353562] bg-white grid px-6 py-3 w-full  content-center  md:w-[40%]">
        <h1 className="mb-4 text-3xl font-semibold text-center">Log In</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formRow}>
            <div className="my-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="inputStyle "
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-600">Email is required</p>
              )}
            </div>
            <>
              <div className="py-2" x-data={{ show }}>
                <span className="px-1 text-md font-semibold my-3 ">
                  Password
                </span>
                <div className="relative">
                  <input
                    id="password"
                    {...register("password", { required: true })}
                    placeholder=""
                    type={show ? "password" : "text"}
                    className="text-md block my-3 px-3 py-2 rounded-lg w-full 
          bg-white border-2 border-gray-200 placeholder-gray-600 shadow-md
          focus:placeholder-gray-500
          focus:bg-white 
          focus:border-black 
          focus:outline-none"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <svg
                      className={`h-6 text-gray-700 ${
                        show ? "hidden" : "block"
                      }`}
                      fill="none"
                      onClick={() => setShow(!show)}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                      ></path>
                    </svg>

                    <svg
                      className={`h-6 text-gray-700 ${
                        show ? "block" : "hidden"
                      }`}
                      fill="none"
                      onClick={() => setShow(!show)}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="currentColor"
                        d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                      ></path>
                    </svg>
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-600">Password is required</p>
                )}
              </div>
            </>
          </div>
          <button className="btn my-4 bg-black">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
