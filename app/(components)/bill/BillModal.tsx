"use client";

import {
  Button,
  CustomFlowbiteTheme,
  Flowbite,
  Modal,
  Table,
} from "flowbite-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Modern_Antiqua } from "next/font/google";
import { useContext, useEffect, useRef, useState } from "react";
import { pdfDownLoad } from "./billInvoice";
import { AuthContext } from "@/context/AuthContext";
const customizeTheme: CustomFlowbiteTheme = {
  modal: {
    root: {
      base: "fixed top-0 right-0 left-0 z-50 h-modal overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
      show: {
        on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
        off: "hidden",
      },
      sizes: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        sz: "w-[70%] min-h-[80vh]",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
      },
    },
    header: {
      base: "flex items-start justify-between rounded-t dark:border-gray-600  p-5",
      popup: "!p-2 !border-b-0",
      title: "text-xl font-medium text-gray-900 dark:text-white",
      close: {
        base: "ml-auto absolute right-0 top-5  inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-red dark:hover:bg-gray-600 dark:hover:text-white",
        icon: "h-5 w-5",
      },
    },
  },
};
export default function BillModal({
  isOpen,
  setopen,
  discount,
  testArr,
  setTestArr,
  totalAmount,
  discountAmount,
  discountPrice,
  bill,
  preparedBy,
}: {
  isOpen: boolean;
  setopen: any;
  discount: string;
  testArr: any;
  discountAmount: string;
  setTestArr: any;
  totalAmount: string;
  discountPrice: string;
  bill: any;
  preparedBy: string;
}) {
  const [tableRow, setableRow] = useState();

  useEffect(() => {
    const to2dDataArray = (items: any) =>
      items.map((item: any, index: any) => [
        index + 1,
        item.test,
        item.type,
        item.price,
      ]);
    const newArr = to2dDataArray(testArr);
    newArr.push(
      ["SubTotal", "", "", totalAmount],

      ["Discount", "", discount + "%", discountAmount],
      ["Amount to pay", "", "", discountPrice],
      ["Paid Amount", "", "", bill.paidAmount],
      ["Due Amount", "", "", parseInt(discountPrice) - bill.paidAmount]
    );
    setableRow(newArr);
    // console.log(newArr);
  }, [
    bill.paidAmount,
    discount,
    discountAmount,
    discountPrice,
    testArr,
    totalAmount,
  ]);
  const { diagnosticInfo } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  return (
    <>
      <Flowbite theme={{ theme: customizeTheme }}>
        {/* <div className="h-auto" id="invoice"> */}
        <Modal size="6xl" show={isOpen} onClose={() => setopen(!isOpen)}>
          <Modal.Header></Modal.Header>
          <div className="overflow-auto" id="invoice">
            <div className="flex items-center pb-3 gap-5 border-b  justify-center">
              <img
                className="h-[100px] w-[100px] object-cover rounded-full "
                src={diagnosticInfo.logo}
                alt="logo"
              />
              <div className="flex flex-col mb-3">
                <div className="text-xl font-medium">{diagnosticInfo.name}</div>
                <div>{diagnosticInfo.address}</div>
                {/* <div>
                  Contact No : 019********** , Email : {diagnosticInfo.email}
                </div> */}
              </div>
            </div>
            <Modal.Body>
              <div className="flex justify-between items-start">
                <div className="text-2xl font-bold">
                  Invoice #: {bill.labId}
                </div>
                <div className="">
                  <h1 className="text-lg font-semibold">Amount</h1>
                  <p>৳{totalAmount}</p>
                </div>
              </div>
              <div className="grid items-start grid-cols-3 gap-3">
                <div className="flex flex-col">
                  <h1 className="font-bold text-lg">Patient Information</h1>
                  <p>Name : {bill.name}</p>
                  <p>Age : {bill.age}</p>
                  <p>Gender : {bill.gender}</p>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-bold text-lg">Others Information</h1>
                  <p>Billed By: k. Hasan</p>
                  <p>Doctor : {bill.doctorName}</p>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-bold text-lg">Date of Issue </h1>
                  <p>{bill.date}</p>
                </div>
              </div>
              <div className="mt-10">
                <div className="text-center my-3 font-bold text-2xl">
                  Billing Details
                </div>

                <div>
                  <div className="overflow-x-auto bg-primary">
                    <Table striped>
                      <Table.Head className="border-b-black bg-[#D3CFCF]  border-[1px]">
                        <Table.HeadCell></Table.HeadCell>
                        <Table.HeadCell>Test Name</Table.HeadCell>
                        <Table.HeadCell>Type</Table.HeadCell>
                        <Table.HeadCell>Net Fee</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        {testArr.map((item: any, key: any) => {
                          return (
                            <Table.Row
                              key={key}
                              className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {key + 1}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {item.test}
                              </Table.Cell>
                              <Table.Cell>{item.type}</Table.Cell>
                              <Table.Cell>{item.price}</Table.Cell>
                            </Table.Row>
                          );
                        })}
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Sub Total
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
                          <Table.Cell></Table.Cell>
                          <Table.Cell>{totalAmount}</Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Discount
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
                          <Table.Cell>{discount} %</Table.Cell>
                          <Table.Cell> {discountAmount}</Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Amount to be pay
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
                          <Table.Cell></Table.Cell>
                          <Table.Cell>{discountPrice}</Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Paid Amount
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
                          <Table.Cell></Table.Cell>
                          <Table.Cell>{bill.paidAmount}</Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Due Amount
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
                          <Table.Cell></Table.Cell>
                          <Table.Cell>
                            {parseInt(discountPrice) - bill.paidAmount}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <div className="text-sm text-center text-gray-500">
              Design and Developed by SasthoTech Ltd
            </div>
          </div>
          <Modal.Footer>
            <button
              onClick={() => {
                pdfDownLoad(tableRow, "download", bill, diagnosticInfo, preparedBy);
              }}
              className="btn bg-black"
            >
              Download
            </button>
            <button
              onClick={() => {
                pdfDownLoad(tableRow, "print", bill, diagnosticInfo, preparedBy);
              }}
              className="btn bg-secondary"
            >
              Print
            </button>
          </Modal.Footer>
        </Modal>
      </Flowbite>
    </>
  );
}
