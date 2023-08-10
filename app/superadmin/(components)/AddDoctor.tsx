"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./../../styles/styles.module.css";
import Swal from "sweetalert2";
import axios from "axios";
type Inputs = {
  name: string;
  specialist: string;
  image: string;
  designation: string;
  division?: string;
  link: string;
};
const AddDoctor = ({ route }: { route: string }) => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${route}`,

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
          Add a new doctor
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formRow}>
            <div className="my-3">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                id="name"
                className="inputStyle "
                {...register("name", { required: true })}
              />
              {errors.name && <p className="text-red-600">Name is required</p>}
            </div>
            <div className="my-3">
              <label htmlFor="specialist">Specialist</label>
              <input
                type="specialist"
                id="specialist"
                className="inputStyle "
                {...register("specialist", { required: true })}
              />
              {errors.specialist && (
                <p className="text-red-600">Specialist is required</p>
              )}
            </div>{" "}
            <div className="my-3">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                id="image"
                className="inputStyle "
                {...register("image", { required: true })}
              />
              {errors.image && (
                <p className="text-red-600">Image is required</p>
              )}
            </div>{" "}
            <div className="my-3">
              <label htmlFor="designation">Designation</label>
              <input
                type="designation"
                id="designation"
                className="inputStyle "
                {...register("designation", { required: true })}
              />
              {errors.designation && (
                <p className="text-red-600">Designation is required</p>
              )}
            </div>{" "}
            <div className="my-3">
              <label htmlFor="designation">Link</label>
              <input
                type="link"
                id="link"
                className="inputStyle "
                {...register("link", { required: true })}
              />
              {errors.link && <p className="text-red-600">Link is required</p>}
            </div>
            {route === "doctor" ? (
              <>
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
              </>
            ) : (
              ""
            )}
          </div>
          <button className="btn my-4 bg-black">Create</button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
