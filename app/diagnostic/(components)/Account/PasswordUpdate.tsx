import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
type passwordUpdate = {
  password: string;
  oldPassword: string;
};
const PasswordUpdate = () => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<passwordUpdate>();
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

    //    console.log(data);
  };
  return (
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
  );
};

export default PasswordUpdate;
