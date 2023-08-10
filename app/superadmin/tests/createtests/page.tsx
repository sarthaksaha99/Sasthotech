"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./../../../styles/styles.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
type Inputs = {
  name: string;
};
const CreateTestPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/test`,

        data,
        {
          withCredentials: true,
        }
      );

      //
      await Swal.fire({
        title: "Success!",
        text: `${response?.data?.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      reset();
      // Check if the "token" cookie exists
    } catch (err: any) {
      if (err.response.status === 422) {
        await Swal.fire({
          title: "Error!",
          text: `Validation Error`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        await Swal.fire({
          title: "Error!",
          text: `Error Occurred due to ${err.message}`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };
  return (
    <div className="bg-[#E9E7E7]  w-full h-[100vh] flex justify-center items-center">
      <div className="mx-auto rounded-lg border-[2px] border-[#353562] bg-white grid px-6 py-3 w-full  content-center  md:w-[40%]">
        <h1 className="mb-4 text-3xl font-semibold text-center">
          Add a new test
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formRow}>
            <div className="my-3">
              <label htmlFor="email">Test Name</label>
              <input
                type="text"
                id="test"
                className="inputStyle "
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-600">Test Name is required</p>
              )}
            </div>
          </div>
          <button className="btn my-4 bg-black">Add Test</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTestPage;
