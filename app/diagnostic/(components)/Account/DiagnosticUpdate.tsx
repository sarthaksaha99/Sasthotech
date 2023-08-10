import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
type DgUpdate = {
  name: string;
  address: string;
  logo: string;
};
const DiagnosticUpdate = () => {
  const { diagnosticInfo, setDiagnosticInfo } = useContext(AuthContext);
  const {
    register: register2,

    handleSubmit: handleSubmit2,

    formState: { errors: errors2 },
  } = useForm<DgUpdate>();

  const onSubmitDgUpdate: SubmitHandler<DgUpdate> = async (data) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/diagnostic`,
        data,
        { withCredentials: true }
      );
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: `${response?.data?.message}`,
        confirmButtonText: "OK",
      });
      //  const {name:string,address:string,logo}=data;
      const newData = {
        ...data,
        id: diagnosticInfo.id,
        division: diagnosticInfo.division,
      };
      setDiagnosticInfo(newData);
    } catch (err: any) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error updating diagnostic info due to ${err.message}`,
        confirmButtonText: "Try Again",
      });
    }

    //  setDgUpdate(!isDgUpdate);
    console.log(data);
  };
  return (
    <div className="my-4 flex gap-10">
      <div className="w-32 h-32 text-center flex justify-center items-center rounded-full border-none" />

      <form onSubmit={handleSubmit2(onSubmitDgUpdate)}>
        <div className="grid w-[80%] grid-cols-2 gap-10 justify-between items-center">
          <div className="">
            <label className="text-gray-400 my-2" htmlFor="password my-2">
              Diagnostic Name
            </label>
            <input
              defaultValue={diagnosticInfo.name}
              type="text"
              id="diagnosticName"
              className="inputStyle "
              {...register2("name", { required: true })}
            />
            {errors2.name && (
              <p className="text-red-600">Diagnostic Name is required</p>
            )}
          </div>
          <div>
            <label className="text-gray-400 my-2" htmlFor="password my-2">
              Address
            </label>
            <input
              defaultValue={diagnosticInfo.address}
              type="text"
              id="address"
              className="inputStyle "
              {...register2("address", { required: true })}
            />
            {errors2.address && (
              <p className="text-red-600">New Password is required</p>
            )}
          </div>
          <div className="">
            <label className="text-gray-400 my-2" htmlFor="password my-2">
              Division
            </label>
            <input
              defaultValue={diagnosticInfo.division}
              type="text"
              id="division"
              readOnly
              className="inputStyle "
            />
          </div>
          <div>
            <label className="text-gray-400 my-2" htmlFor="password my-2">
              Logo Link
            </label>
            <input
              defaultValue={diagnosticInfo.logo}
              type="text"
              id="logo"
              className="inputStyle "
              {...register2("logo", { required: true })}
            />
            {errors2.logo && (
              <p className="text-red-600">Logo Link is required</p>
            )}
          </div>
        </div>
        <button className="btn my-4 bg-black">Update Information</button>
      </form>
    </div>
  );
};

export default DiagnosticUpdate;
