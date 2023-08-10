import { Suspense } from "react";
import ReportTable from "../(components)/tables/ReportTable";

const page = () => {
  return (
    <div className="bg-[#E9E7E7] flex flex-col items-center min-h-screen px-10 py-20">
      <h1 className="text-3xl font-semibold border-[1px] border-black px-3 py-2 rounded-lg">
        Daily Report Summary
      </h1>
      <div className="md:px-5 w-full md:w-[70%] my-10 ">
        <Suspense fallback={<div>Loading Repo.............</div>}>
          <ReportTable></ReportTable>
        </Suspense>
      </div>
      <div className="btn hover:scale-1 bg-[#4A4545]"> Total Tests : 91</div>
    </div>
  );
};

export default page;
