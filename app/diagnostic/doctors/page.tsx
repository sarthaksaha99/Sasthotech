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

const AllDoctorsPage = () => {
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const getPageNumber = (param: number) => {
    setPage(param);
  };
  const [limit, setLimit] = useState<number>(10);
  const [outsideDoctor, setOutsideDoctor] = useState([{} as any]);
  const { adminDoctors, setAdminDoctors, outSideDoctors, setOutSideDoctors } =
    useContext(AdminContext);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  useEffect(() => {
    console.log("page", page);
    const loadDoctor = async () => {
      try {
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
        if (data?.data?.totalItems !== 0) setAdminDoctors(data?.data?.items);
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
        if (data?.data?.totalItems !== 0) setOutSideDoctors(data?.data);
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
  }, [limit, page, setAdminDoctors]);

  return (
    <div className="flex px-10 min-h-[100vh] bg-[#E9E7E7] flex-col  text-center">
      <h1 className="text-center text-3xl font-semibold my-5">
        Here is the list all doctors
      </h1>
      <div className="bg-white py-5 rounded-md px-5 my-5 w-full shadow-xl flex justify-between items-center">
        <p className="text-2xl font-bold">Doctors list </p>
        {activeIndex === 0 && (
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
        )}
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
        <select className="border-none rounded-md w-[40%] ">
          <option value="rajshahi" selected>
            Rajshahi
          </option>
          <option value="barisal" disabled>
            Barisal (service coming soon)
          </option>
          <option value="chittagong" disabled>
            Chittagong (service coming soon)
          </option>
          <option value="dhaka" disabled>
            Dhaka (service coming soon)
          </option>
          <option value="khulna" disabled>
            Khulna (service coming soon)
          </option>
          <option value="mymensingh" disabled>
            Mymensingh (service coming soon)
          </option>

          <option value="rangpur" disabled>
            Rangpur (service coming soon)
          </option>
          <option value="sylhet" disabled>
            Sylhet (service coming soon)
          </option>
        </select>
        <button className="btn bg-gray-600">Search</button>
        <button
          onClick={() => setActiveIndex(activeIndex === 0 ? 1 : 0)}
          className="btn bg-black"
        >
          {activeIndex === 0 ? "Outside " : "Inside "}
          Doctor
        </button>
      </div>

      <div
        className={`${activeIndex === 1 && "h-[100vh] overflow-y-scroll"} my-3`}
      >
        <div>
          {/* heading */}
          <div className="grid my-3 items-center font-semibold text-lg grid-cols-5">
            <div className="flex justify-center  items-center gap-3">Name</div>
            <div>Designation</div>
            <div>Specialist</div>
            <div>Division</div>
            <div></div>
          </div>
        </div>

        {activeIndex === 0 &&
          adminDoctors?.map((doc, index) => {
            return (
              <AdminDoctorLists
                index={activeIndex}
                id={doc.id}
                route="admin/doctor"
                name={doc.name}
                division={doc.division}
                specialist={doc.specialist}
                logo={doc.image}
                designation={doc.designation}
                key={index}
              ></AdminDoctorLists>
            );
          })}
        {activeIndex === 1 &&
          outSideDoctors?.map((doc, index) => {
            return (
              <AdminDoctorLists
                index={activeIndex}
                id={doc.id}
                route="/doctorchamber"
                name={doc.Doctor?.name}
                division={"Rajshahi"}
                specialist={doc.Doctor?.specialist}
                logo={doc.Doctor?.image}
                designation={doc.Doctor?.designation ?? "Professor"}
                key={index}
              ></AdminDoctorLists>
            );
          })}
      </div>

      {activeIndex === 0 && (
        <div className="absolute w-[80%] bottom-0">
          <Pagination
            itemsPerPage={limit}
            getPageNumber={getPageNumber}
            totalItems={totalItems}
          ></Pagination>
        </div>
      )}
    </div>
  );
};

export default AllDoctorsPage;
