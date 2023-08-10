"use client";
import TestSummaryTable from "@/app/(components)/tables/TestSummaryTable";
import { DateRangePicker, DateRangePickerValue } from "@tremor/react";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Expense } from "../expense/page";
import ExpenseTable from "@/app/(components)/tables/ExpenseTable";

const DailyTestSummary = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(),
    selectValue: "tdy",
  });
  const [tests, setTests] = useState([{} as any]);
  const [dailyExpenses, setDailyExpenses] = useState<Expense[]>([
    {} as Expense,
  ]);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const getExpense = (data: number) => {
    console.log(data);
    setTotalExpense(data);
  };

  useEffect(() => {
    async function loadTests() {
      try {
        let altFrom;
        if (dateRange.from) altFrom = new Date(dateRange.from as Date);
        else altFrom = new Date();
        const altTo = new Date();
        altFrom.setHours(0, 0, 0, 0);
        const fromAlt = new Date(altFrom);
        fromAlt.setHours(23, 59, 59, 999);
        altTo.setHours(23, 59, 59, 999);
        dateRange.to?.setHours(23, 59, 59, 999);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/test?from=${
            dateRange.from ?? altFrom
          }&to=${dateRange.to ?? fromAlt}`,
          { withCredentials: true }
        );

        console.log(response.data.data);
        //  setDiagnosticInfo(newObj);
        setTests(response.data.data.items);
      } catch (err: any) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error loading bill list due to ${err.message}`,
        });
      }
    }
    loadTests();
    async function loadUserInfo() {
      try {
        let altFrom;
        if (dateRange.from) altFrom = new Date(dateRange.from as Date);
        else altFrom = new Date();
        const altTo = new Date();
        altFrom.setHours(0, 0, 0, 0);
        const fromAlt = new Date(altFrom);
        fromAlt.setHours(23, 59, 59, 999);
        altTo.setHours(23, 59, 59, 999);
        dateRange.to?.setHours(23, 59, 59, 999);
        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/dailyExpense?from=${altFrom}&to=${dateRange.to ?? fromAlt}`,
          { withCredentials: true }
        );

        console.log(response.data.data);
        //  setDiagnosticInfo(newObj);
        setDailyExpenses(response.data.data.items);
      } catch (err: any) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error loading bill list due to ${err.message}`,
        });
      }
    }
    loadUserInfo();
    // console.log(dateRange);
  }, [dateRange]);
  return (
    <div className="bg-[#E9E7E7] flex flex-col items-center min-h-screen px-10 py-20">
      <h1 className="text-3xl flex justify-center font-semibold border-[1px] border-black px-3 py-2 rounded-lg">
        Daily Summary
      </h1>
      <div className="md:px-5 w-full md:w-[70%] my-10 ">
        <div className="relative flex justify-center">
          <label
            className="bg-primary px-3 w-auto h-auto flex items-center justify-center  text-center rounded-l-lg text-black"
            htmlFor="name"
          >
            Select Date Range
          </label>
          <DateRangePicker
            className="w-full"
            value={dateRange}
            onValueChange={setDateRange}
            selectPlaceholder="Select"
            maxDate={new Date()}
            placeholder="Select date range"
          />
        </div>
        <div className="flex my-10 justify-center gap-10">
          <div
            onClick={() => setActiveIndex(0)}
            className={`text-xl cursor-pointer ${
              activeIndex === 0 ? "bg-black text-white" : ""
            }  px-3 py-1 rounded-md`}
          >
            Total Summary
          </div>
          <div
            onClick={() => setActiveIndex(1)}
            className={`text-xl cursor-pointer ${
              activeIndex === 1 ? "bg-black text-white" : ""
            }  px-3 py-1 rounded-md`}
          >
            {" "}
            Tests Summary
          </div>
          <div
            onClick={() => setActiveIndex(2)}
            className={`text-xl cursor-pointer ${
              activeIndex === 2 ? "bg-black text-white" : ""
            }  px-3 py-1 rounded-md`}
          >
            {" "}
            Expense Summary
          </div>
          <div
            onClick={() => setActiveIndex(3)}
            className={`text-xl cursor-pointer ${
              activeIndex === 3 ? "bg-black text-white" : ""
            }  px-3 py-1 rounded-md`}
          >
            Income Summary
          </div>
        </div>
        <Suspense fallback={<div>Loading Repo.............</div>}>
          {activeIndex === 0 ? (
            "No data Found"
          ) : activeIndex === 1 ? (
            <TestSummaryTable tests={tests}></TestSummaryTable>
          ) : activeIndex === 2 ? (
            <>
              <ExpenseTable
                getExpense={getExpense}
                tableData={dailyExpenses}
              ></ExpenseTable>
            </>
          ) : (
            "no data found"
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default DailyTestSummary;
