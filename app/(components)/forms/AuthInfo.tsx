"use client";
import { Button, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import React from "react";
import styles from "./../../styles/styles.module.css";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { useFormData } from "@/context/formcontext";
type Inputs = {
  email: string;
  password: string;
  website: string;
  avatar_url: string;
};
const AuthInfo = ({
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
  return (
    <div className={formStep === 0 ? styles.showForm : styles.hideForm}>
      <div className="mx-auto grid h-full w-full  content-center  md:w-[50%]">
        <h1 className="mb-4 text-3xl font-semibold">Personal Info</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formRow}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="inputStyle "
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className={styles.errorText}>Email is required</p>
            )}
            <label htmlFor="password my-2">password</label>
            <input
              type="password"
              id="password"
              className="inputStyle "
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className={styles.errorText}>Password is required</p>
            )}
          </div>
          <button className="btn bg-black">Next</button>
        </form>
      </div>
    </div>
  );
};

export default AuthInfo;
