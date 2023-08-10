"use client";
import { IDoctorItem } from "@/Types/types.doctor";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DoctorsList from "../(components)/doctors/DoctorsList";
import axios from "axios";
import Pagination from "../(components)/Pagination";

const DoctorListPage = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const getPageNumber = (param: number) => {
    setPage(param);
  };
  const [doctors, setDoctors] = useState<IDoctorItem[]>([{} as IDoctorItem]);
  const [outsideDoctor, setOutsideDoctor] = useState([{} as any]);
  useEffect(() => {
    const loadDoctor = async () => {
      try {
        // await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor`, {
        //   withCredentials: true,
        // });
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/doctor?page=${page}&limit=${limit}`;
        console.log(url);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/doctor?page=${page}&limit=${limit}`,
          { withCredentials: true }
        );
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/diagnostic?page=${page}&limit=${limit}`
        // );
        const data = response.data;
        console.log(data);
        setTotalItems(data?.data?.totalItems);
        if (data?.data?.totalItems !== 0) setDoctors(data?.data?.items);
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
    const loadDoctorFromScraped = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/doctorchamber`,
          { withCredentials: true }
        );
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/diagnostic?page=${page}&limit=${limit}`
        // );
        const data = response.data;
        console.log(data?.data);
        // setTotalItems(data?.data?.totalItems);
        if (data?.data?.totalItems !== 0) setOutsideDoctor(data?.data);
        data?.data.map((d: { Doctor: IDoctorItem }) => {
          setDoctors((prev) => [...prev, d.Doctor]);
        });
      } catch (error: any) {
        Swal.fire({
          title: "Failed to Load",
          text: `${error.message}`,
          icon: "error",
        });
        console.log(`Error Occurred`);
      }
    };
    loadDoctorFromScraped();
  }, [limit, page, setDoctors]);

  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);
  return (
    <div className="flex relative px-10 min-h-[100vh] bg-[#E9E7E7] flex-col  text-center">
      <h1 className="text-center text-3xl font-semibold my-5">
        Here is the list of our valuable doctors
      </h1>
      <div className="bg-white py-5 rounded-md px-5 my-5 w-full shadow-xl flex justify-between items-center">
        <p className="text-2xl font-bold">Doctor list </p>
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
      <div className="grid gap-10 my-10  w-full grid-cols-3">
        {doctors.length &&
          doctors?.map(
            (doc, index) =>
              doc.id && <DoctorsList doctor={doc} key={index}></DoctorsList>
          )}
      </div>
      <div className="absolute w-[90%] bottom-0">
        <Pagination
          itemsPerPage={limit}
          getPageNumber={getPageNumber}
          totalItems={totalItems}
        ></Pagination>
      </div>
    </div>
  );
};

export default DoctorListPage;
