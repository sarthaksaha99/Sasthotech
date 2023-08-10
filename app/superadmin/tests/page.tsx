"use client";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IDiagnostic } from "./../../../Types/type.diagnostic";
import axios from "axios";
import { TextInput, Tooltip } from "flowbite-react";
import { AiFillDelete } from "react-icons/ai";
import DiagnosticLists from "../(components)/DiagnosticLists";
import {
  DiagnosticContext,
  DiagnosticProvider,
} from "@/context/DiagnosticContext";
import Pagination from "@/app/(components)/Pagination";

const AllTests = () => {
  const [totalItems, setTotalItems] = useState<number>(0);
  const getPageNumber = (param: number) => {
    setPage(param);
  };
  const [page, setPage] = useState<number>(1);
  const [totalTest, setTotalTest] = useState("");
  const [limit, setLimit] = useState<number>(10);
  const [tests, setTests] = useState([{} as any]);
  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/test?page=${page}&limit=${limit}`,
          { withCredentials: true }
        );
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/diagnostic?page=${page}&limit=${limit}`
        // );
        const data = response.data;
        console.log(data);
        setTests(data?.data?.items);
        setTotalTest(data?.data?.totalItems);
      } catch (error: any) {
        Swal.fire({
          title: "Failed to Load",
          text: `${error.message}`,
          icon: "error",
        });
        console.log(`Error Occurred`);
      }
    };
    loadDoctor();
  }, [limit, page, setTests]);
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/test/${id}`,
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
  return (
    <div className="flex px-10 min-h-[100vh] bg-[#E9E7E7] flex-col  text-center">
      <h1 className="text-center text-3xl font-semibold my-5">
        Here is the list all Tests
      </h1>
      <div className="bg-white py-5 rounded-md px-5 my-5 w-full shadow-xl flex justify-between items-center">
        <p className="text-2xl font-bold">Test List list ({totalTest}) </p>
        <p>
          Show :
          <select
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className="border-none bg-[#F1F3F5] focus:outline-none rounded-md outline-none"
            name=""
            id=""
          >
            <option value="10">100</option>
            <option value="25">200</option>
            <option value="35">300</option>
            <option value="45">400</option>
            <option value="55">500</option>
          </select>
        </p>
      </div>
      <div className="my-5 px-10 grid-cols-7 grid gap-5">
        {tests.map((t, index) => {
          return (
            <p
              key={index}
              className="bg-white text-lg flex justify-center gap-1 hover:bg-black hover:text-white items-center px-4 py-2 rounded-lg"
            >
              {t.name}{" "}
              <Tooltip content="Delete this test">
                <AiFillDelete
                  onClick={() => removeTest(t.id)}
                  className="cursor-pointer"
                ></AiFillDelete>
              </Tooltip>
            </p>
          );
        })}
      </div>
      <div className="absolute w-[80%] bottom-0">
        <Pagination
          itemsPerPage={limit}
          getPageNumber={getPageNumber}
          totalItems={parseInt(totalTest)}
        ></Pagination>
      </div>
    </div>
  );
};

export default AllTests;
