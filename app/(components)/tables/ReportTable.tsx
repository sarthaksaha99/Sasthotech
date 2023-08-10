"use client";

import { CustomFlowbiteTheme, Flowbite, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";

const ReportTable = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const delay = 1500; // Delay in milliseconds (3 seconds in this example)
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center md:w-[70%] my-10 mx-auto">
        <Spinner aria-label="Purple spinner example" color="purple" />
      </div>
    );
  }
  const customTheme: CustomFlowbiteTheme = {
    table: {
      body: {
        base: "group/body",
        cell: {
          base: "group-first/body:group-first/row:first:rounded-tl-lg border-black group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg md:px-6 py-1 px-0 md:py-4",
        },
      },
      head: {
        base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
        cell: {
          base: "group-first/head:first:rounded-tl-lg max-w-[70px] md:w-auto group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 md:px-6 px-0 py-1 md:py-3",
        },
      },
    },
  };
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Table className="w-full md:w-[70%] my-10 mx-auto">
        <Table.Head>
          <Table.HeadCell className="text-xl">Sl No . </Table.HeadCell>
          <Table.HeadCell className="text-xl">Test Name</Table.HeadCell>
          <Table.HeadCell className="text-xl">Done Today</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-[#E9E7E7] border-black  border-b-[1px] dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap border-r-[1px] text-lg    font-medium text-gray-900 dark:text-white">
              1
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap border-r-[1px] text-lg    font-medium text-gray-900 dark:text-white">
              X- Ray
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap border-r-[1px] text-lg    font-medium text-gray-900 dark:text-white">
              34
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-[#E9E7E7] border-black  border-b-[1px] dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap border-r-[1px] text-lg    font-medium text-gray-900 dark:text-white">
              2
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap border-r-[1px] text-lg    font-medium text-gray-900 dark:text-white">
              Y- Ray
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap border-r-[1px] text-lg    font-medium text-gray-900 dark:text-white">
              57
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Flowbite>
  );
};

export default ReportTable;
