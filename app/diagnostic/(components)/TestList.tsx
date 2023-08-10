import { AdminContext } from "@/context/AdminContext";
import { DiagnosticContext } from "@/context/DiagnosticContext";
import axios from "axios";
import React, { useContext } from "react";
import Swal from "sweetalert2";

const TestLists = ({
  id,
  name,
  price,
  type,
}: {
  id: string;
  name: string;
  price: number;
  type: string;
}) => {
  const { tests, setTests } = useContext(AdminContext);

  const removeTest = async (id: string | undefined) => {
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "This will remove this device from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    });
    if (res.isConfirmed) {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/test/${id}`,
          { withCredentials: true }
        );
        console.log(response);
        await Swal.fire({
          title: "Success",
          text: `${response?.data?.message}`,
          icon: "success",
          confirmButtonText: "OK",
        });
        const newarr = tests.filter((dg) => dg.id !== id);
        setTests(newarr);
      } catch (error: any) {
        Swal.fire({
          title: "Failed to Delete",
          text: `${error.message}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    }
    // console.log(res);
  };
  // const imgUrl = `${logo}||data:image/png;base64,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`;
  return (
    <div className="grid items-center my-3 text-lg grid-cols-4">
      <div>{name || "not set"}</div>
      <div>{price || "not set"}</div>
      <div>{type}</div>
      <button
        onClick={() => {
          removeTest(id);
        }}
        className="btn w-[50%] bg-gray-600"
      >
        Remove
      </button>
    </div>
  );
};

export default TestLists;
