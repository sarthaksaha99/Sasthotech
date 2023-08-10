"use client";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IDiagnostic } from "./../../../Types/type.diagnostic";
import axios from "axios";
import { TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import DoctorsList from "@/app/(components)/doctors/DoctorsList";

import { DiagnosticContext } from "@/context/DiagnosticContext";
import DoctorsLists from "@/app/superadmin/(components)/DoctorsLists";
import { AdminContext } from "@/context/AdminContext";
import AdminDoctorLists from "../(components)/AdminDoctorsList";
import Pagination from "@/app/(components)/Pagination";
import ReceptionistList from "../(components)/ReceptionistList";

const AllDoctorsPage = () => {
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const getPageNumber = (param: number) => {
    setPage(param);
  };
  const [limit, setLimit] = useState<number>(10);
  const { receptionist, setReceptionist } = useContext(AdminContext);
  useEffect(() => {
    console.log("page", page);
    const loadDoctor = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/receptionist?page=${page}&limit=${limit}`,
          { withCredentials: true }
        );
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/diagnostic?page=${page}&limit=${limit}`
        // );
        const data = response.data;
        console.log(data);
        setTotalItems(data?.data?.totalItems);
        if (data?.data?.totalItems !== 0) setReceptionist(data?.data?.items);
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
  }, [limit, page, setReceptionist]);

  return (
    <div className="flex px-10 min-h-[100vh] bg-[#E9E7E7] flex-col  text-center">
      <h1 className="text-center text-3xl font-semibold my-5">
        Here is the list all receptionist
      </h1>
      <div className="bg-white py-5 rounded-md px-5 my-5 w-full shadow-xl flex justify-between items-center">
        <p className="text-2xl font-bold">Receptionist list </p>
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
      <div className="grid grid-cols-3 my-5 gap-5">
        {receptionist?.map((doc, index) => {
          return (
            <ReceptionistList
              id={doc.id}
              route="admin/receptionist"
              name={doc.name}
              email={doc.email}
              key={index}
            ></ReceptionistList>
          );
        })}
      </div>

      <div className="absolute w-[80%] bottom-0">
        <Pagination
          itemsPerPage={limit}
          getPageNumber={getPageNumber}
          totalItems={totalItems}
        ></Pagination>
      </div>
    </div>
  );
};

export default AllDoctorsPage;
