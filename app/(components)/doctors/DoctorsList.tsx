"use client";

import { IDoctorItem } from "@/Types/types.doctor";
import { Card, Dropdown } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

export default function DoctorsList({ doctor }: { doctor: IDoctorItem }) {
  const { designation, id, link, name, specialist } = doctor;
  let { image } = doctor;

  // let newImage;
  if (image === "No Image") {
    image =
      "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg";
  }
  return (
    <Card>
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col gap-2 items-center pb-10">
        <Image
          width={300}
          src={image}
          className="w-[150px] h-[150px] border-[1px] border-black object-cover rounded-full"
          height={300}
          alt="Image"
        ></Image>

        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {designation}
        </span>
        <p>specialist : {specialist}</p>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <Link
            className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            href={`doctors/bookappointment/${doctor.id}`}
          >
            <p>Book Appointment</p>
          </Link>
          <a
            className="inline-flex font-bold items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm  text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            href="#"
          >
            <p>Print Appointment List</p>
          </a>
        </div>
      </div>
    </Card>
  );
}
