"use client";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

import axios from "axios";
import { TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { AdminContext } from "@/context/AdminContext";
import TestLists from "../(components)/TestList";

const AllDiagnostics = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { tests, setTests } = useContext(AdminContext);
  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/test?page=${page}&limit=${limit}`,
          { withCredentials: true }
        );
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/diagnostic?page=${page}&limit=${limit}`
        // );
        const data = response.data;
        console.log(data);
        setTests(data?.data?.items);
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

  return (
    <div className="flex px-10 min-h-[100vh] bg-[#E9E7E7] flex-col  text-center">
      <h1 className="text-center text-3xl font-semibold my-5">
        Here is the list all Tests
      </h1>
      <div className="bg-white py-5 rounded-md px-5 my-5 w-full shadow-xl flex justify-between items-center">
        <p className="text-2xl font-bold">Tests list </p>
        <p>
          Show :
          <select
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className="border-none bg-[#F1F3F5] focus:outline-none rounded-md outline-none"
            name=""
            id=""
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="35">35</option>
            <option value="45">45</option>
            <option value="55">55</option>
            <option value="75">75</option>
          </select>
        </p>
      </div>
      <div className="flex rounded-md px-10 py-3 gap-5 bg-[#F1F3F5] items-center">
        <TextInput
          icon={HiSearch}
          id="email4"
          placeholder="Search"
          required
          type="email"
          className="w-[40%]"
        />
        <button className="btn bg-gray-600">Search</button>
      </div>

      <div>
        {/* heading */}
        <div className="grid my-3 items-center font-semibold text-lg grid-cols-4">
          <div>Name</div>
          <div>Price</div>
          <div>Type</div>
          <div></div>
        </div>
        {tests.map((t, index) => {
          return (
            <TestLists
              id={t.id}
              name={t.name}
              price={t.price}
              type={t.type}
              key={index}
            ></TestLists>
          );
        })}
      </div>
    </div>
  );
};

export default AllDiagnostics;
