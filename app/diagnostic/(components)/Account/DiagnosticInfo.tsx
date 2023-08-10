import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";

const DiagnosticInfo = () => {
  const { diagnosticInfo } = useContext(AuthContext);
  return (
    <div className="my-4 flex gap-10">
      <img
        className="w-32 h-32 text-center flex justify-center items-center rounded-full border-[1px] border-black"
        src={diagnosticInfo.logo}
        alt="Logo"
      />
      <div className="grid w-[80%] grid-cols-2 justify-between">
        <div>
          {" "}
          <p className="text-gray-400">Diagnostic Name</p>
          {diagnosticInfo.name || "Not Set"}
        </div>
        <div>
          {" "}
          <p className="text-gray-400">Address</p>
          {diagnosticInfo.address || "Not set"}
        </div>
        <div>
          {" "}
          <p className="text-gray-400">Division</p>
          {diagnosticInfo.division || "Not set"}
        </div>
        <div>
          {" "}
          <p className="text-gray-400 ">Logo Link</p>
          <p className="text-ellipsis w-[100%] overflow-hidden">
            {diagnosticInfo.logo || "Not set"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticInfo;
