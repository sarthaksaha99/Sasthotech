"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
interface Inputs {
  name: string;
  phone: string;
  date?: string;
  time: string;
}
const AppointmentPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const [startDate, setStartDate] = useState(new Date());
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("hi");
    console.log(data);
    const date = startDate.toISOString().slice(0, 10);
    data.date = date;
    console.log(data);

    /// post the data to endpoint

    // giving the serial no in return

    await Swal.fire({
      title: "Success",
      icon: "success",
      text: `Patient Serial No is ${6}`,
      confirmButtonText: "Ok",
      confirmButtonColor: "black",
    });
    reset();
  };
  return (
    <div className="bg-[#E9E7E7] flex justify-center min-h-screen">
      <div className="my-10 w-full gap-10 flex flex-col items-center mx-10">
        <h1 className=" font-bold text-4xl">Doctor Appointment Request Form</h1>
        <div className="w-[70%] rounded-md bg-white shadow-xl h-[50vh]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-5 mx-20 my-10 grid-cols-2">
              <div className="my-3">
                <label htmlFor="name">Name</label>
                <input
                  type="name"
                  id="name"
                  placeholder="Enter Patient Name"
                  className="inputStyle "
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-600">Name is required</p>
                )}
              </div>
              <div className="my-3">
                <label htmlFor="image">Phone No </label>
                <input
                  type="text"
                  id="image"
                  placeholder="Enter Mobile No "
                  className="inputStyle "
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <p className="text-red-600">Phone is required</p>
                )}
              </div>{" "}
              <div className="my-3">
                <label htmlFor="image">Serial No </label>
                <input
                  type="text"
                  id="image"
                  readOnly
                  value={6}
                  className="inputStyle cursor-not-allowed !outline-none !focus:border-none"
                />
              </div>{" "}
              <div className="my-3">
                {" "}
                <label htmlFor="image">Time </label>
                <input
                  type="text"
                  id="image"
                  {...register("time", { required: true })}
                  className="inputStyle cursor-not-allowed !outline-none !focus:border-none"
                />
              </div>
              <div>
                <p className="my-3">Select Appointment Date</p>

                <DatePicker
                  className="block"
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button className="btn mx-auto  my-4 bg-black">
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
