"use client";

import React, { useState } from "react";
import styles from "./../../styles/styles.module.css";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { useFormData } from "@/context/formcontext";
import { IDoctor, ITest } from "@/Types/types.forms";
import { ToastContainer } from "react-toastify";
type Inputs = {
  tests: ITest[];
};

const TestList = ({
  formStep,
  nextFormStep,
}: {
  formStep: number;
  nextFormStep: () => void;
}) => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { setFormValues } = useFormData();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setFormValues(data);
    nextFormStep();
    console.log(data);
  };
  type demoType = {
    name: string;
  };
  const Arr: demoType[] = [
    {
      name: "text",
    },
  ];
  // console.log("here is all info:::" + JSON.stringify(info));
  const [inputArr, setInputArr] = useState(Arr);
  const addInput = () => {
    setInputArr((prevState: demoType[]) => {
      return [
        ...prevState,
        {
          name: "text",
        },
      ];
    });
  };

  return (
    <div className={formStep === 3 ? styles.showForm : styles.hideForm}>
      <div className="mx-auto grid h-full w-full  content-center  ">
        <h1 className="mb-4 text-3xl text-center font-semibold">Add Tests</h1>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full gap-y-5 grid grid-cols-3">
            <label className="col-span-1 " htmlFor="institution font-medium ">
              Test Name
            </label>
            <input
              placeholder="Enter Test Name"
              type="name"
              id="name"
              className="inputStyle col-span-2 "
              {...register(`tests.${inputArr.length}.name`, {
                required: true,
              })}
            />

            <label className="col-span-1" htmlFor="price my-3">
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter number"
              className="inputStyle col-span-2 "
              {...register(`tests.${inputArr.length}.price`, {
                required: true,
              })}
            />
            <label className="col-span-1" htmlFor="room my-3">
              Room No
            </label>
            <input
              type="room"
              id="room"
              placeholder="Enter room number"
              className="inputStyle col-span-2 "
              {...register(`tests.${inputArr.length}.room`, {
                required: true,
              })}
            />
          </div>

          <div className="flex justify-end w-full my-5">
            <p
              onClick={addInput}
              className=" cursor-pointer px-4 py-2 text-white bg-black rounded-lg"
            >
              Add
            </p>
          </div>
          <button className="btn bg-black">Next</button>
        </form>
      </div>
    </div>
  );
};

export default TestList;
