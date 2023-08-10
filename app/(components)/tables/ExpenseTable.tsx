import { CustomFlowbiteTheme, Flowbite, Table } from "flowbite-react";
import { Expense } from "../../diagnostic/expense/page";
import { useEffect, useState } from "react";
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
const ExpenseTable = ({
  getExpense,
  tableData,
}: {
  tableData: Expense[];
  getExpense: (param: number) => void;
}) => {
  useEffect(() => {
    let total = 0;
    tableData.forEach((data) => {
      total += data.amount;
    });
    //setTotalExpense(total);
    getExpense(total);
  }, [tableData]);
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Table className="w-[90%] md:w-[70%] my-10 mx-auto">
        <Table.Head>
          <Table.HeadCell className=" text-sm md:text-xl">
            Sl No.
          </Table.HeadCell>
          <Table.HeadCell className=" text-sm md:text-xl">Type</Table.HeadCell>
          <Table.HeadCell className=" text-sm md:text-xl">
            Handed To
          </Table.HeadCell>
          <Table.HeadCell className=" text-sm md:text-xl">
            Amount
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tableData.map((data, i) => {
            return (
              <Table.Row
                key={i}
                className="bg-[#E9E7E7] border-black  border-b-[1px] dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap border-r-[1px] text-lg    font-medium text-gray-900 dark:text-white">
                  {i + 1}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap border-r-[1px] text-lg    font-medium text-gray-900 dark:text-white">
                  {data.type}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap border-r-[1px] text-lg    font-medium text-gray-900 dark:text-white">
                  {data.handedTo}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap border-r-[1px]  text-lg   font-medium text-gray-900 dark:text-white">
                  BDT {data.amount}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Flowbite>
  );
};

export default ExpenseTable;
