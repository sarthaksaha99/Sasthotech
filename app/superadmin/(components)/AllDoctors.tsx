"use client";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IDiagnostic } from "./../../../Types/type.diagnostic";
import axios from "axios";
import { TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import DoctorsLists from "./DoctorsLists";

import { DiagnosticContext } from "@/context/DiagnosticContext";
import Pagination from "@/app/(components)/Pagination";
import { fileteredData } from "@/app/(components)/utils/FilterSearchedData";

const AllDoctors = ({ route }: { route: string }) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { doctors, setDoctors } = useContext(DiagnosticContext);
  const [isClicked, setClicked] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(0);
  const getPageNumber = (param: number) => {
    setPage(param);
  };
  const filterData = async (param: string) => {
    console.log(param);
    fileteredData(
      ["name", "designation", "specialist", "division"],
      doctors,
      param
    );
  };
  const scrapeDoctorData = async () => {
    setClicked(!isClicked);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor`,
        {},
        {
          withCredentials: true,
        }
      );
      Swal.fire({
        title: "Success",
        text: `Data Scrape Successful`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "black",
      });
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/diagnostic?page=${page}&limit=${limit}`
      // );
      const data = response.data;
      console.log(data);
      // if (data?.data?.totalItems !== 0) setDoctors(data?.data?.items);
    } catch (error: any) {
      Swal.fire({
        title: "Failed to Load",
        text: `${error.message}`,
        icon: "error",
      });
      console.log(`Error Occurred`);
    }
  };

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        // await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor`, {
        //   withCredentials: true,
        // });
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${route}?page=${page}&limit=${limit}`,
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
  }, [limit, page, route, setDoctors, isClicked]);

  return (
    <div className="flex relative px-10 min-h-[100vh] bg-[#E9E7E7] flex-col  text-center">
      <h1 className="text-center text-3xl font-semibold my-5">
        Here is the list all doctors
      </h1>
      <div className="bg-white py-5 rounded-md px-5 my-5 w-full shadow-xl flex justify-between items-center">
        <p className="text-2xl font-bold">Doctors list </p>
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
          onChange={(e) => {
            filterData(e.target.value);
          }}
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

        {/* <button onClick={scrapeDoctorData} className="btn bg-black">
          Scrape Data
        </button> */}
      </div>

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

      {doctors.length &&
        doctors?.map((doc, index) => {
          return (
            <DoctorsLists
              id={doc.id}
              route={route}
              name={doc.name}
              division={doc.division}
              specialist={doc.specialist}
              logo={doc.image}
              designation={doc.designation}
              key={index}
            ></DoctorsLists>
          );
        })}
      <div className="my-10"></div>
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

export default AllDoctors;
