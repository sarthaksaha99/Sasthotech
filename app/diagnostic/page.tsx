"use client";
import { Card, CustomFlowbiteTheme, Flowbite, Table } from "flowbite-react";
import Link from "next/link";
import { Suspense, useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
const customTheme: CustomFlowbiteTheme = {
  table: {
    body: {
      base: "group/body",
      cell: {
        base: "group-first/body:group-first/row:first:rounded-tl-lg text-md border-[1px] border-black text-center group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg px-6 py-4",
      },
    },
    head: {
      base: "group/head text-md uppercase bg-[black]  text-gray-700 dark:text-gray-400",
      cell: {
        base: "group-first/head:first:rounded-tl-lg text-center border-[1px] border-black group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-6 py-3",
      },
    },
  },
};
import "react-datepicker/dist/react-datepicker.css";
import AdminLayout from "./layout";
import Swal from "sweetalert2";
import axios from "axios";
import { DateRangePicker, DateRangePickerValue } from "@tremor/react";
import Loading from "../loading";
import { AuthContext } from "@/context/AuthContext";
import { IBillSummary } from "@/Types/type.admintest";
const AdminDashBoard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(),
    selectValue: "tdy",
  });
  const { diagnosticInfo } = useContext(AuthContext);
  const [billSummary, setBillSummary] = useState<IBillSummary>(
    {} as IBillSummary
  );
  useEffect(() => {
    async function loadBillSummary() {
      console.log(diagnosticInfo, "");

      try {
        let altFrom;
        if (dateRange.from) altFrom = new Date(dateRange.from as Date);
        else altFrom = new Date();
        const altTo = new Date();
        const fromAlt = new Date(altFrom);
        fromAlt.setHours(23, 59, 59, 999);
        altFrom.setHours(0, 0, 0, 0);
        altTo.setHours(23, 59, 59, 999);
        dateRange.to?.setHours(23, 59, 59, 999);

        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/admin/dashboard/bill?from=${altFrom}&to=${dateRange.to ?? fromAlt}`,
          { withCredentials: true }
        );

        setBillSummary(response.data.data);
        //  setDiagnosticInfo(newObj);
        // setBillList(response.data.data.items);
      } catch (err: any) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error loading bill list due to ${err.message}`,
        });
      }
    }
    loadBillSummary();
    //   console.log(dateRange);
  }, [dateRange]);
  return (
    <div className="text-center w-[100%] min-h-[100vh] h-auto flex flex-col items-center bg-[#E5E5E5] p-14">
      <div className="flex my-5 justify-center items-center gap-5">
        <img
          className="w-[100px] h-[100px] rounded-full border-[1px] border-black"
          src={diagnosticInfo.logo}
          alt="Company Logo"
        />
        <div>
          <h3 className="text-3xl mt-5 font-semibold text-center">
            {diagnosticInfo.name}
          </h3>
          <p className="text-lg">{diagnosticInfo.address}</p>
        </div>
      </div>
      <div className="w-[80%] flex justify-center my-5">
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
      <div className="w-[70%] my-5">
        <Suspense fallback={<Loading></Loading>}>
          <Flowbite theme={{ theme: customTheme }}>
            <Table striped className="w-[80%]">
              <Table.Head className="border-b-black bg-[#D3CFCF]  border-[1px]">
                <Table.HeadCell>Total Expenses</Table.HeadCell>
                <Table.HeadCell>Total Revenue</Table.HeadCell>
                <Table.HeadCell>Total Profit</Table.HeadCell>
                <Table.HeadCell>Profit Increase</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {billSummary.dailyExpenseAmount ?? 0}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {billSummary.billTotalAmout ?? 0}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {(billSummary.billTotalAmout ?? 0) -
                      (billSummary.dailyExpenseAmount ?? 0)}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {billSummary.preBillTotalAmout
                      ? (billSummary.billTotalAmout ?? 0) /
                        (billSummary.preBillTotalAmout ?? 1)
                      : "Not Available"}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Flowbite>
        </Suspense>
      </div>
    </div>
  );
};

export default AdminDashBoard;
