"use client";
import { Table } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import HospitalBillPage from "../(components)/HospitalBillPage";
import Image from "next/image";
import BillModal from "../(components)/bill/BillModal";
import IDoctorItem2 from "../../Types/types.doctor";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const typeList = ["SHOULDER", "ARM", "LEG", "HEAD"];
// {
//   "name":"Rafid",
//   "age": 23,
//   "gender":"Male",
//   "paidAmount": 120,
//   "hospitalDiscount": 10,
//   "doctorPercentage": 15,
//   "pcName": "Shihab",
//   "pcPercentage": 5,
//   "phone":"01909793389",
//   "doctorId": "clkafjloa0003enpubaubwtz4",
//   "doctorNameFix": "Rafid",
//   "tests": [
//       {
//           "testId": 1,
//           "quantity": 1
//       }
//   ]
// }
const NewBill = () => {
  const [bill, setBill] = useState({
    date: new Date().toISOString().slice(0, 10),
    labId: "",
    name: "",
    age: 0,
    gender: "",
    doctorNameFix: "",
    doctorPercentage: 10,
    doctorId: "",
    hospitalDiscount: 0,
    pcPercentage: 5,
    totalAmount: 0,
    paidAmount: 0,
    phone: "",
    pcName: "",
    tests: [],
  });

  const [totalAmount, setTotalAmount] = useState("0");
  const [discount, setDiscount] = useState(0);
  const [test, setTest] = useState("");
  const [type, setType] = useState("");
  const [referredBy, setRefferredBy] = useState("");
  const [testIds, setTestIds] = useState([]);
  const [testId, setTestId] = useState("");
  const [testArr, setTestArr] = useState([]);
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState(0);
  const { user } = useContext(AuthContext);
  const handleTotalAmount = (e) => {
    e.preventDefault();
    setTotalAmount(e.target.value);
    setBill({ ...bill, totalAmount });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    bill.tests = [...testArr];
    console.log(bill);
  };
  useEffect(() => {
    const tempArr = [...testArr];
    const totalAmount = tempArr.reduce((acc, item) => acc + item.price, 0); // Calculate the total amount
    setTotalAmount(totalAmount);
  }, [testArr]);
  const addTest = (e) => {
    e.preventDefault();
    if (testId === "") {
      return Swal.fire({
        title: "Failed!",
        text: `Please select a test`,
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "black",
      });
    }
    const tempArr = [...testArr];
    tempArr.push({
      test,
      type,
      testId,
      price: parseFloat(price), // Convert the price to a number
    });
    addTestIdWithQuantity(parseInt(testId), 1);
    console.log(tempArr);
    setTestArr(tempArr);
    bill.tests = [...tempArr];
    setBill({ ...bill, totalAmount }); // Update the totalAmount property in the bill state
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const handleTestChange = (e) => {
    const selectedTest = e.target.value;
    const [selectedId, selectedName, price, type] = selectedTest.split(",");

    //console.log("hi", selectedId, selectedName, price, type);

    setTest(selectedName);

    setType(type);
    // Assuming you have access to the test prices somewhere
    setPrice(price);
    setTestId(selectedId);
  };
  const addTestIdWithQuantity = (newId, quantity) => {
    const updatedTestIds = [...testIds];
    const existingIndex = updatedTestIds.findIndex(
      (item) => item.testId === newId
    );
    if (existingIndex !== -1) {
      // If the ID already exists, increase the quantity
      updatedTestIds[existingIndex].quantity += quantity;
    } else {
      // If the ID does not exist, add a new entry to the array
      updatedTestIds.push({ testId: parseInt(newId), quantity });
    }
    console.log("hi");
    setTestIds((prevTestIds) => {
      return updatedTestIds;
    });
  };
  const [doctorsList, setDoctorsList] = useState([{}]);
  const [testList, setTestsList] = useState([{}]);
  useEffect(() => {
    const loadDocs = async () => {
      try {
        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/admin/doctor?page=${1}&limit=${100}`,
          {
            withCredentials: true,
          }
        );

        const data = response.data;
        //   console.log(data);
        setDoctorsList(data?.data?.items);
      } catch (error) {
        Swal.fire({
          title: "Failed to Load",
          text: `${error.message}`,
          icon: "error",
        });
        console.log(`Error Occurred`);
      }
    };
    loadDocs();
    const loadTests = async () => {
      try {
        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/admin/test?page=${1}&limit=${100}`,
          {
            withCredentials: true,
          }
        );

        const data = response.data;
        //   console.log(data);
        setTestsList(data?.data?.items);
      } catch (error) {
        Swal.fire({
          title: "Failed to Load",
          text: `${error.message}`,
          icon: "error",
        });
        console.log(`Error Occurred`);
      }
    };
    loadTests();
    const loadDoctorFromScraped = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/doctorchamber`,
          { withCredentials: true }
        );
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/diagnostic?page=${page}&limit=${limit}`
        // );
        const data = response.data;
        //  console.log(data?.data);
        // setTotalItems(data?.data?.totalItems);
        if (data?.data?.totalItems !== 0) {
          const outSideDoctors = data?.data;
          const doctorArray = outSideDoctors.map((item) => item.Doctor);

          setDoctorsList((prev) => [...prev, ...doctorArray]);
        }
      } catch (error) {
        Swal.fire({
          title: "Failed to Load",
          text: `${error.message}`,
          icon: "error",
        });
        console.log(`Error Occurred`);
      }
    };
    loadDoctorFromScraped();
  }, []);
  async function saveBillToDB() {
    const { date, totalAmount, labId, ...others } = { ...bill };
    const data = others;
    data.tests = testIds;
    data.pcName = user.name ?? "";
    data.paidAmount = isNaN(data.paidAmount) ? 0 : data.paidAmount;
    console.log(data);
    const { doctorId } = data;
    if (doctorId === "" && referredBy !== "self") {
      setModalOpen(false);
      return Swal.fire({
        title: "Failed!",
        text: `Please add a doctor`,
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "black",
      });
    }
    try {
      if (doctorId === "") {
        data.doctorId = "clkugft0h000denfeyf307ulc";
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bill`,

        data,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      setModalOpen(!isModalOpen);
      await Swal.fire({
        title: "Success!",
        text: `${response?.data?.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      const billId = response?.data?.data?.billId;
      setBill({ ...bill, labId: billId });
      //console.log(role);

      //  // login(role as string);
      //   if (role === "superadmin") router.push("/superadmin");
      //   else if (role === "admin") router.push("/diagnostic/account");
      // Check if the "token" cookie exists
    } catch (err) {
      //console.log(err.message);
      await Swal.fire({
        title: "Error!",
        text: `Failed to save due to ${err.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    console.log(data);
  }
  return (
    <>
      <div className="grid mb-20  grid-cols-8 w-[100%]">
        <div className="col-span-2 hidden image-selection">
          {" "}
          <img
            className="h-[100px] w-[100px] object-cover "
            src="https://th.bing.com/th/id/R.6c8d162699a8610897f43452840ac181?rik=zd%2fat%2buvr6CTFQ&riu=http%3a%2f%2fih0.redbubble.net%2fimage.207973242.9515%2fsticker%2c375x360.u4.png&ehk=%2bkIsEJ49lfePiWubYKj3%2bugQKbxiij724tDmTNhHEQk%3d&risl=&pid=ImgRaw&r=0"
            alt="logo"
          />
        </div>
        <div className="col-span-6 hidden  bill-page">
          <HospitalBillPage
            labId={bill.labId}
            name={bill.name}
            date={bill.date}
            age={bill.age}
            gender={bill.gender}
            doctor={bill.doctorName}
          ></HospitalBillPage>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto">
        <div className="header text-center text-3xl font-bold my-8 ">
          New Bill
        </div>

        <div className="flex flex-col-reverse md:flex-row">
          <div className="p-4 md:p-2 md:w-full md:pr-8">
            <div className="primary-info flex flex-wrap">
              <label className="labelStyle">
                <span className="px-2">Date</span>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  className="w-[100%] border bg-[#D3CFCF] border-gray-300 rounded-md px-3 py-2"
                  onChange={(e) => {
                    setBill({ ...bill, date: e.target.value });
                  }}
                  disabled
                />
              </label>

              <label className="labelStyle">
                <span className="px-2">Name</span>
                <input
                  type="text"
                  placeholder="Patient Name"
                  className=" inputStyle"
                  onChange={(e) => {
                    setBill({ ...bill, name: e.target.value });
                  }}
                />
              </label>
              <label className="labelStyle">
                <span className="px-2">Age</span>
                <input
                  type="number"
                  placeholder="Patient Age"
                  className=" inputStyle"
                  onChange={(e) => {
                    setBill({ ...bill, age: parseInt(e.target.value) });
                  }}
                />
              </label>
              <label className="labelStyle">
                <span className="px-2">Phone</span>
                <input
                  type="text"
                  placeholder="Patient Phone"
                  className=" inputStyle"
                  onChange={(e) => {
                    setBill({ ...bill, phone: e.target.value });
                  }}
                />
              </label>
              <label className="labelStyle">
                <span className="px-2">Gender</span>
                <select
                  className=" inputStyle"
                  onChange={(e) => {
                    console.log(bill);
                    setBill({ ...bill, gender: e.target.value });
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
              <label className="labelStyle">
                <span className="px-2">Doctor Name</span>
                <select
                  required
                  className="inputStyle"
                  onChange={(e) => {
                    console.log("hi", e.target.value);
                    const selectedValue = e.target.value;
                    const [selectedId, selectedName] = selectedValue.split(","); // Splitting id and name using the comma delimiter
                    setBill({
                      ...bill,
                      doctorId: selectedId,
                      doctorNameFix: selectedName,
                    });
                    // console.log(bill);
                  }}
                >
                  <option value="">Select Doctor Name</option>
                  {doctorsList.map((doc, index) => {
                    // Creating a value that contains both id and name separated by a comma
                    const value = `${doc.id},${doc.name}`;
                    return (
                      <option key={index} value={value}>
                        {doc.name}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <form className="test-info">
              <div className="flex flex-wrap md:text-lg text-sm">
                <label className="labelStyle">
                  <span className="px-2">Test Name</span>
                  <select
                    required
                    className="inputStyle"
                    onChange={handleTestChange}
                  >
                    <option value="">Select Test</option>
                    {testList.map((test, key) => {
                      const value = `${test.id},${test.name},${test.price},${test.type}`;
                      return (
                        <option key={key} value={value}>
                          {test.name} ------- {test.type}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <div className="flex justify-center">
                <button onClick={addTest} className=" btn bg-black">
                  Add
                </button>
              </div>
            </form>

            <div className="mt-10 mb-16">
              <div className="text-center font-bold text-2xl">Bill Preview</div>

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
                      {testArr.map((item, key) => {
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
                            <Table.Cell>
                              {item.price}
                              <span
                                className="pl-3 cross-btn text-red-500"
                                onClick={(e) => {
                                  e.preventDefault();
                                  const tempArr = testArr.filter(
                                    (_, i) => i !== key
                                  );
                                  setTestArr(tempArr);
                                  bill["tests"] = [tempArr];
                                }}
                              >
                                X
                                {/* <i className="remove-test-btn fa-solid fa-square-xmark"></i> */}
                              </span>{" "}
                            </Table.Cell>
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
                        <Table.Cell>
                          {" "}
                          {parseFloat(
                            parseInt(totalAmount) * (discount / 100)
                          ).toFixed(0)}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          Amount to be pay
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell>
                          {parseFloat(
                            parseInt(totalAmount) -
                              parseInt(totalAmount * (discount / 100))
                          ).toFixed(0)}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          Paid Amount
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell>
                          {isNaN(bill.paidAmount) ? 0 : bill.paidAmount}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          Due Amount
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell>
                          {parseFloat(
                            parseInt(totalAmount) -
                              parseInt(totalAmount) * (discount / 100)
                          ) -
                            parseInt(
                              isNaN(bill.paidAmount) ? 0 : bill.paidAmount
                            )}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
                <div className="flex justify-center mt-3">
                  <button
                    className="btn bg-[#4A4545] print-btn"
                    onClick={() => {
                      saveBillToDB();
                    }}
                  >
                    Print doc
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-5 md:w-1/6">
            <div className="flex discount-section flex-col">
              {/* discont part */}
              <div className="discount-part">
                <div className="text-center text-2xl">Referred By</div>
              </div>
              <label className="labelStyle">
                <span className="px-2">Referred by</span>
                <select
                  onChange={(e) => {
                    setRefferredBy(e.target.value);
                  }}
                  className=" inputStyle"
                >
                  <option value="">Select Referred by</option>
                  <option value="hospital">Hospital</option>
                  <option value="doctor">Doctor</option>
                  <option value="self">Self</option>
                </select>
              </label>
              <div className="text-center text-2xl">Discount</div>
              <label className="labelStyle">
                <span className="px-2">Percentage</span>
                <input
                  onChange={(e) => {
                    setDiscount(e.target.value);
                    setBill({
                      ...bill,
                      hospitalDiscount: parseInt(e.target.value),
                    });
                  }}
                  type="number"
                  placeholder="Parcentage"
                  className=" inputStyle"
                />
              </label>
              <label className="labelStyle">
                <span className="px-2">Amount</span>
                <input
                  type="text"
                  placeholder="Amount"
                  className=" inputStyle"
                  value={`${parseFloat(
                    (parseInt(totalAmount) / discount) | 0
                  ).toFixed(0)}`}
                />
              </label>

              {/* intotal part */}
              <div className="text-center text-2xl">In Total</div>
              <label className="labelStyle">
                <span className="px-2">Now Pay</span>
                <input
                  type="text"
                  placeholder=""
                  className=" inputStyle"
                  value={`${parseFloat(
                    parseInt(totalAmount) -
                      parseFloat((parseInt(totalAmount) / discount) | 0)
                  ).toFixed(0)}`}
                  disabled
                />
              </label>
              <BillModal
                isOpen={isModalOpen}
                setopen={setModalOpen}
                totalAmount={totalAmount}
                discount={discount}
                discountAmount={parseFloat(
                  (parseInt(totalAmount) / discount) | 0
                ).toFixed(0)}
                testArr={testArr}
                setTestArr={setTestArr}
                bill={bill}
                preparedBy={user.name}
                discountPrice={parseFloat(
                  parseInt(totalAmount) -
                    parseInt(totalAmount * (discount / 100))
                ).toFixed(0)}
              ></BillModal>
              {/* pc part */}
              <label className="labelStyle">
                <span className="px-2">Paid Amount</span>
                <input
                  type="number"
                  placeholder="Paid Amount"
                  className=" inputStyle"
                  defaultValue={0}
                  onChange={(e) => {
                    // console.log(bill);
                    setBill({
                      ...bill,
                      paidAmount: parseInt(e.target.value),
                    });
                  }}
                />
              </label>
              <label className="labelStyle">
                <span className="px-2">PC Name</span>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className=" inputStyle"
                />
              </label>
              <label className="labelStyle">
                <span className="px-2">Percentage</span>
                <input
                  type="text"
                  placeholder="Now Pay"
                  className=" inputStyle"
                />
              </label>
              {/* <div className="flex justify-end">
                <button className="m-2 btn bg-green-500">Save Bill</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBill;
