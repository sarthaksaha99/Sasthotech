"use client";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";

import Swal from "sweetalert2";
import ReactToPrint from "react-to-print";
import ExpenseTable from "@/app/(components)/tables/ExpenseTable";
import axios from "axios";
import { DateRangePicker, DateRangePickerValue } from "@tremor/react";
export interface Expense {
  type: string;
  handedTo: string;
  amount: number;
}
const ExpensePage = () => {
  //  all states
  const [dailyExpenses, setDailyExpenses] = useState<Expense[]>([
    {} as Expense,
  ]);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  // function for checking whether type , amount or handed to is fulfilled or not
  const check = async (dateRange: any) => {
    console.log(dateRange);
  };
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(),
    selectValue: "tdy",
  });
  const getExpense = (data: number) => {
    console.log(data);
    setTotalExpense(data);
  };
  useEffect(() => {
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
    //  console.log(dateRange);
    // console.log("Use effect", dateRange);
  }, [dateRange]);
  return (
    <div className="bg-[#E9E7E7] w-full flex flex-col items-center min-h-screen px-0 md:px-10 py-20">
      <h1 className="text-3xl font-semibold text-center">
        Daily Expenses Summary
      </h1>
      <div className="relative w-full my-5 flex justify-center">
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

      <div className="md:px-5 w-full md:w-[90%] ">
        <ExpenseTable
          getExpense={getExpense}
          tableData={dailyExpenses}
        ></ExpenseTable>
      </div>
      <div className="btn hover:scale-1 bg-green-500">
        {" "}
        Total Expenses : BDT {totalExpense}
      </div>
    </div>
  );
};

export default ExpensePage;
