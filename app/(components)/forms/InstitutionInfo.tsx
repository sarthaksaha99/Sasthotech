"use client";

import React from "react";
import styles from "./../../styles/styles.module.css";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { useFormData } from "@/context/formcontext";
type Inputs = {
  institution: string;
  logo: string;
  address: string;
};

const InstitutionInfo = ({
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
    <div className={formStep === 1 ? styles.showForm : styles.hideForm}>
      <div className="mx-auto grid h-full w-full  content-center  md:w-[50%]">
        <h1 className="mb-4 text-3xl font-semibold">Institution Info</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formRow}>
            <label htmlFor="institution font-medium">Institution</label>
            <input
              placeholder="Enter Institution Name"
              type="institution"
              id="institution"
              className="inputStyle "
              {...register("institution", { required: true })}
            />
            {errors.institution && (
              <p className={styles.errorText}>This Field is required</p>
            )}
            <label htmlFor="address my-3">Address</label>
            <input
              type="address"
              id="address"
              placeholder="Enter Address"
              className="inputStyle "
              {...register("address", { required: true })}
            />
            {errors.address && (
              <p className={styles.errorText}>This field is required</p>
            )}
            <label htmlFor="logo my-3">Logo Link</label>
            <input
              type="logo"
              id="logo"
              placeholder="Enter logo link"
              className="inputStyle "
              {...register("logo")}
            />
          </div>
          <button className="btn bg-black">Next</button>
        </form>
      </div>
    </div>
  );
};

export default InstitutionInfo;
