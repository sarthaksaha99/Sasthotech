import React from "react";

const HospitalBillPage = ({
  labId,
  name,
  age,
  gender,
  doctor,
  date,
}: {
  labId: string;
  name: string;
  age: string;
  gender: string;
  doctor: string;
  date: string;
}) => {
  return (
    <div className="container ">
      <div className="grid grid-cols-3 mb-4">
        <div className="flex  gap-2 items-center  p-2">
          <p className="text-sm  mb-1">Date: {date}</p>
        </div>
        <div className="flex  gap-2 items-center  p-2">
          <p className="text-sm  mb-1">Lab ID: {labId}</p>
        </div>

        <div className="flex gap-2 items-center  p-2">
          <p className="text-sm  mb-1">Patient Name:{name}</p>
        </div>
        <div className="flex gap-2 items-center  p-2">
          <p className="text-sm  mb-1">Age: {age}</p>
        </div>
        <div className="flex gap-2 items-center  p-2">
          <p className="text-sm  mb-1">Gender: {gender}</p>
        </div>
        <div className="flex gap-2 items-center  p-2">
          <p className="text-sm  mb-1">Doctor Name: {doctor} </p>
        </div>
      </div>
    </div>
  );
};

export default HospitalBillPage;
