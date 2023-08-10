"use client";
import { IDoctorItem2 } from "@/Types/types.doctor";
import { fileteredData } from "@/app/(components)/utils/FilterSearchedData";
import { AuthContext } from "@/context/AuthContext";
import { TextInput } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import AdminDoctorLists from "../../(components)/AdminDoctorsList";
import Swal from "sweetalert2";
import axios from "axios";
import Link from "next/link";

// Search in `author` and in `tags` array
const keys = ["name"];

const AddDoctorPage = () => {
  const { doctors } = useContext(AuthContext);
  const [searchParam, setSearchParam] = useState<string>("");
  const [filterData, setFilteredData] = useState<IDoctorItem2[]>(doctors);
  //   async function searchData() {
  //     // if (searchParam.length !== 0) {
  //     const data = await fileteredData(keys, doctors, searchParam);

  //     const newArr = data.map((r: any) => {
  //       return r;
  //     });
  //     setFilteredData(newArr);
  //     console.log(newArr);
  //     // }
  //   }
  useEffect(() => {
    async function func() {
      //  console.log("searchParam", searchParam.length);
      const data = await fileteredData(keys, doctors, searchParam);
      //   console.log(data);
      setFilteredData(data as unknown as IDoctorItem2[]);
    }
    if (searchParam.trim() !== "") func();
    else setFilteredData(doctors);
  }, [doctors, searchParam]);
  async function addDoctor(id: string) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/doctorchamber`,
        {
          time: "8:00 Pm",
          place: "201",
          doctorId: id,
        },
        { withCredentials: true }
      );
      await Swal.fire({
        title: "Success!",
        text: `${response?.data?.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      if (error instanceof Error)
        Swal.fire({
          title: "Error",
          text: `${error.message}`,
        });
      else
        Swal.fire({
          title: "Error",
          text: `Unexpected Error`,
        });
    }
  }
  //const setData = () => {};

  return (
    <div className="p-10 ">
      <h1 className="text-3xl my-5">Search in the database </h1>
      <div className="flex rounded-md px-10 py-3 gap-5 bg-[#F1F3F5] items-center">
        <TextInput
          onChange={(e) => setSearchParam(e.target.value)}
          icon={HiSearch}
          id="email4"
          placeholder="Search by Name"
          required
          type="email"
          className="w-[40%]"
        />
        <Link href="/diagnostic/doctors/addDoctors/new">
          <button className="btn bg-gray-600">Go to New Doctor Page</button>
        </Link>
      </div>
      <div className="h-[100vh] overflow-y-scroll">
        <div>
          {/* heading */}
          <div className="grid my-3 items-center text-center font-semibold text-lg grid-cols-4">
            <div className="flex justify-center  items-center gap-3">Name</div>
            <div className="text-center">Designation</div>
            <div>Specialist</div>
            <div>Action</div>
            <div></div>
          </div>
        </div>

        {filterData?.map((doc, index) => {
          return (
            <div key={index}>
              <div className="grid text-center items-center my-3 text-lg grid-cols-4">
                <div className="flex  items-center gap-3">
                  <img
                    className="w-14 h-14 object-cover rounded-full"
                    src={`${doc.image}`}
                    alt="Logo"
                  />
                  {doc.name}
                </div>
                <div>{doc.designation}</div>
                <div>{doc.specialist}</div>

                <button
                  onClick={() => {
                    addDoctor(doc.id);
                  }}
                  className="btn w-[50%] block mx-auto bg-gray-600"
                >
                  Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddDoctorPage;
