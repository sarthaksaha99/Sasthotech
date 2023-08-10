"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./../../../styles/styles.module.css";
import Swal from "sweetalert2";
import axios from "axios";
type Inputs = {
  email: string;
  password: string;
  division: string;
};
const CreateDiagPage = () => {
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/diagnostic`,

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
          Create a New Diagnostic
        </h1>

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
            <label htmlFor="password my-2">Demo Password</label>
            <input
              type="password"
              id="password"
              className="inputStyle "
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-600">Password is required</p>
            )}
            <label htmlFor="division my-3"> Division</label>
            <select className="inputStyle my-3" {...register("division")}>
              <option value="barisal">Barisal</option>
              <option value="chittagong">Chittagong</option>
              <option value="dhaka">Dhaka</option>
              <option value="khulna">Khulna</option>
              <option value="mymensingh">Mymensingh</option>
              <option value="rajshahi">Rajshahi</option>
              <option value="rangpur">Rangpur</option>
              <option value="sylhet">Sylhet</option>
            </select>
          </div>
          <button className="btn my-4 bg-black">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateDiagPage;
