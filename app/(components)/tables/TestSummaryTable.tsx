import { CustomFlowbiteTheme, Flowbite, Table } from "flowbite-react";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  Key,
} from "react";

const customTheme: CustomFlowbiteTheme = {
  table: {
    body: {
      base: "group/body",
      cell: {
        base: "group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg md:px-6 py-1 px-0 md:py-4",
      },
    },
    head: {
      base: "group/head text-xs  text-gray-700 dark:text-gray-400",
      cell: {
        base: "group-first/head:first:rounded-tl-lg max-w-[70px] md:w-auto group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 md:px-6 px-0 py-1 md:py-3",
      },
    },
  },
};

const TestSummaryTable = ({ tests }: { tests: any }) => {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Table className="w-[100%] md:w-[70%] my-10 mx-auto">
        <Table.Head>
          <Table.HeadCell className="  text-sm md:text-xl">
            Sl No.
          </Table.HeadCell>
          <Table.HeadCell className=" text-sm md:text-xl">Name</Table.HeadCell>
          <Table.HeadCell className=" text-sm md:text-xl">
            TestName
          </Table.HeadCell>
          <Table.HeadCell className=" text-sm md:text-xl">
            TestType
          </Table.HeadCell>
          <Table.HeadCell className=" text-sm md:text-xl">
            TestQuantity
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tests.map(
            (
              t: {
                pasentName:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | PromiseLikeOfReactNode
                  | null
                  | undefined;
                testName:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | PromiseLikeOfReactNode
                  | null
                  | undefined;
                testType:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | PromiseLikeOfReactNode
                  | null
                  | undefined;
                testQuantity:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | PromiseLikeOfReactNode
                  | null
                  | undefined;
              },
              index: number
            ) => {
              return (
                <Table.Row
                  key={index}
                  className="bg-[#E9E7E7] border-black  border-b-[1px] dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap border-r-[1px] text-lg    font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap border-r-[1px] text-lg    font-medium text-gray-900 dark:text-white">
                    {t.pasentName}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap border-r-[1px] text-lg    font-medium text-gray-900 dark:text-white">
                    {t.testName}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap border-r-[1px]  text-lg   font-medium text-gray-900 dark:text-white">
                    {t.testType}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap border-r-[1px]  text-lg   font-medium text-gray-900 dark:text-white">
                    {t.testQuantity}
                  </Table.Cell>
                </Table.Row>
              );
            }
          )}
        </Table.Body>
      </Table>
    </Flowbite>
  );
};

export default TestSummaryTable;
