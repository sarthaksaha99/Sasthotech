"use client";
import { DateRangePicker, DateRangePickerValue, Title } from "@tremor/react";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  Select,
  TextInput,
} from "flowbite-react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { divide } from "lodash";
const BillListPage = () => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [email, setEmail] = useState("");
  const props = { openModal, setOpenModal, email, setEmail };
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(),
    selectValue: "tdy",
  });
  const [billList, setBillList] = useState([{} as any]);
  const [currentBillId, setCurrentBillId] = useState<number>(0);
  const [billPaidAmount, setBillPaidAmount] = useState<number>(0);
  const [billStatus, setBillStatus] = useState<string>("created");

  const inputRef = useRef<HTMLInputElement | null>(null);
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/bill?from=${altFrom}&to=${
            dateRange.to ?? fromAlt
          }`,
          { withCredentials: true }
        );

        console.log(response.data.data);
        //  setDiagnosticInfo(newObj);
        setBillList(response.data.data.items);
      } catch (err: any) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error loading bill list due to ${err.message}`,
        });
      }
    }
    loadUserInfo();
    //   console.log(dateRange);
  }, [dateRange]);
  async function deleteBill(id: string) {
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "This will remove bill list",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "red",
      reverseButtons: true,
    });
    if (res.isConfirmed) {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/bill/${id}`,
          { withCredentials: true }
        );
        console.log(response);
        await Swal.fire({
          title: "Success",
          text: `${response?.data?.message}`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "black",
        });
        const newarr = billList.filter((dg) => dg.id !== id);
        setBillList(newarr);
      } catch (error: any) {
        Swal.fire({
          title: "Failed to Delete",
          text: `${error.message}`,
          icon: "error",
          confirmButtonText: "Try Again",
          confirmButtonColor: "black",
        });
      }
    }
  }
  async function UpdateBill() {
    props.setOpenModal(undefined);
    const inputValue = parseInt(inputRef?.current?.value as string);
    setBillPaidAmount(inputValue);
    const data = {
      status: billStatus,
      paidAmount: isNaN(inputValue) ? billPaidAmount : inputValue,
    };

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bill/${currentBillId}`,
        data,
        { withCredentials: true }
      );
      console.log(response);
      await Swal.fire({
        title: "Success",
        text: `${response?.data?.message}`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "black",
      });
      const newarr = billList.filter((dg) => dg.id !== currentBillId);
      const arr = billList.filter((bl) => bl.id === currentBillId);
      arr[0].status = data.status;
      arr[0].paidAmount = data.paidAmount;
      const billArray = [...newarr, ...arr];
      console.log(arr);
      billArray.sort((a, b) => a.id - b.id);
      setBillList(billArray);
    } catch (error: any) {
      Swal.fire({
        title: "Failed to Delete",
        text: `${error.message}`,
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "black",
      });
    }
  }
  return (
    <div className="flex  bg-[#E9E7E7] min-h-screen flex-col items-center ">
      <div className="relative  w-[70%] min-h-[50vh] bg-white my-10 p-10 ">
        <div className="flex justify-between">
          <h1 className="text-4xl font-semibold">Bill List</h1>
          <div
            onClick={() => {
              console.log("object");
            }}
            className="flex relative  z-[999] gap-3"
          >
            <DateRangePicker
              className="w-full"
              value={dateRange}
              onValueChange={setDateRange}
              selectPlaceholder="Select"
              maxDate={new Date()}
              placeholder="Select date range"
            />
          </div>
        </div>
        {billList.length ? (
          <div>
            <div className="font-semibold mt-4 -z-10 text-xl  text-white rounded-md bg-gray-500 py-4 px-2 grid grid-cols-6 justify-between text-center">
              <p className="text-center">Bill Id</p>
              <p>Patient Name</p>
              <p>Date</p>
              <p>Amount</p>
              <p>Status</p>
              <p></p>
            </div>
            {billList.map((bill, index) => {
              return (
                <div
                  key={index}
                  className={`font-normal rounded-md z-0 py-4 px-2 grid grid-cols-6 justify-between text-center ${
                    index % 2 === 1 ? "bg-gray-200" : ""
                  }`}
                >
                  <p className="text-center underline cursor-pointer">
                    {bill.billId}
                  </p>
                  <p className="text-center">{bill.name}</p>
                  <p className="text-center">{bill.createdAt?.slice(0, 10)}</p>
                  <p className="text-center">{bill.totalAmout}</p>
                  <p className="text-center">
                    {bill.status !== "test done" ? (
                      <>
                        {bill.totalAmout === bill.paidAmount ? (
                          <span className="text-green-600 font-semibold">
                            Paid
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold">
                            Due(
                            {parseInt(bill.totalAmout) -
                              parseInt(bill.paidAmount)}
                            )
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        {bill.status}
                      </span>
                    )}
                  </p>
                  <div className="flex gap-2">
                    <p
                      onClick={() => {
                        props.setOpenModal("form-elements");
                        setBillPaidAmount(bill.paidAmount);
                        setCurrentBillId(bill.id);
                      }}
                      className="bg-green-500 px-2 py-1 rounded-md cursor-pointer text-white font-semibold"
                    >
                      Update
                    </p>
                    <p
                      onClick={() => {
                        deleteBill(bill.id);
                      }}
                      className="bg-red-500 px-2 py-1 rounded-md cursor-pointer text-white font-semibold"
                    >
                      Delete
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center font-semibold  my-auto text-3xl text-red-500">
            {" "}
            No bill list is found in this period{" "}
          </div>
        )}
      </div>
      <>
        <Modal
          show={props.openModal === "form-elements"}
          size="md"
          popup
          onClose={() => props.setOpenModal(undefined)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-2xl text-center font-medium text-gray-900 dark:text-white">
                Update The Bill
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="paidAmount" value="Paid Amount" />
                </div>

                <TextInput
                  ref={inputRef}
                  id="paidAmount"
                  type="number"
                  placeholder="Enter Amount"
                  required
                />
              </div>
              <div className="max-w-md" id="select">
                <div className="mb-2 block">
                  <Label htmlFor="status" value="Select Current Status" />
                </div>
                <Select
                  onChange={(e) => setBillStatus(e.target.value.toLowerCase())}
                  id="status"
                  required
                >
                  <option>Created</option>
                  <option>Due</option>
                  <option>Paid</option>
                  <option>Test Done</option>
                </Select>
              </div>

              <div className="w-full flex justify-center">
                <Button
                  onClick={() => {
                    UpdateBill();
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default BillListPage;
