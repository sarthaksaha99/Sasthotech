"use client";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";

import Swal from "sweetalert2";
import ReactToPrint from "react-to-print";
import ExpenseTable from "@/app/(components)/tables/ExpenseTable";
import axios from "axios";
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
  const [handedTo, setHandedTo] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const [types, setTypes] = useState<string>("");
  const [expense, setExpense] = useState<number>(0);
  const [singleExpense, setSingleExpense] = useState<Expense>({} as Expense);

  // useEffect for updating the daily expenses state whenever a new expense is being added
  const addExpense = (singleExpense: Expense) => {
    if (_.isEmpty(singleExpense)) {
    } else {
      const newExpenses = [...dailyExpenses, singleExpense];

      console.log(newExpenses);
      if (_.isEmpty(dailyExpenses[0])) {
        console.log("hi");
        setDailyExpenses([singleExpense]);
      } else setDailyExpenses(newExpenses);
      const newVal = expense + _.parseInt(amount);
      setExpense(newVal);
      setTypes("");
      setAmount("");
      setHandedTo("");
    }
  };
  // function for checking whether type , amount or handed to is fulfilled or not
  const check = async (types: string, amount: string, handedTo: string) => {
    if (types === "" || amount === "" || handedTo === "") {
      let emptyParams = [];
      if (types === "") {
        emptyParams.push("type");
      }
      if (amount === "") {
        emptyParams.push("amount");
      }
      if (handedTo === "") {
        emptyParams.push("handedTo");
      }
      await Swal.fire({
        title: "Error!",
        text: `Please fill up the following input field(s): ${emptyParams.join(
          ", "
        )}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      const newObject = { type: types, amount: parseInt(amount), handedTo };
      console.log(newObject);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/dailyExpense`,
          newObject,
          { withCredentials: true }
        );
        await Swal.fire({
          title: "Success!",
          text: `${response?.data?.message}`,
          icon: "success",
          confirmButtonText: "Ok",
        });
        setSingleExpense(newObject);
        addExpense(newObject);
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
  };
  const expenseTableRef = useRef(null);
  return (
    <div className="bg-[#E9E7E7] w-full flex flex-col items-center min-h-screen px-0 md:px-10 py-20">
      <h1 className="text-3xl font-semibold text-center">Daily Expenses</h1>
      <div className="row my-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <span className="flex ">
          <label
            className="bg-primary w-[100px] pt-2 text-center rounded-l-lg text-white"
            htmlFor="name"
          >
            Type
          </label>
          <input
            required
            onChange={(e) => setTypes(e.target.value)}
            className="basic-slide rounded-r-lg outline-primary"
            id="type"
            type="text"
            value={types}
            placeholder="Enter Type Here"
          />
        </span>
        <span className="flex ">
          {" "}
          <label
            className="bg-primary w-[100px] pt-2 text-center rounded-l-lg text-white"
            htmlFor="email"
          >
            Handed To
          </label>
          <input
            onChange={(e) => setHandedTo(e.target.value)}
            className="basic-slide rounded-r-lg outline-primary"
            id="handedTo"
            type="text"
            required
            value={handedTo}
            placeholder="Enter Person Name "
          />
        </span>
        <span className="flex ">
          {" "}
          <label
            className="bg-primary w-[100px] pt-2 text-center rounded-l-lg text-white"
            htmlFor="phone"
          >
            Amount
          </label>
          <input
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
            className="basic-slide rounded-r-lg outline-primary"
            id="amount"
            type="number"
            placeholder="Enter Amount"
          />
        </span>
      </div>
      <div>
        <button
          onClick={() => check(types, amount, handedTo)}
          className="btn bg-green-500"
        >
          Add Expense
        </button>
      </div>

      {/* <div className="md:px-5 w-full md:w-[90%] ">
        <ExpenseTable tableData={dailyExpenses}></ExpenseTable>
      </div> */}
      {/* <div className="btn hover:scale-1 bg-green-500">
        {" "}
        Total Expenses : ${expense}
      </div> */}
    </div>
  );
};

export default ExpensePage;
