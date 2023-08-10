"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./../../../styles/styles.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import { AiOutlinePlusSquare, AiFillCheckCircle } from "react-icons/ai";
import { HiSearch } from "react-icons/hi";
import { useEffect, useState } from "react";
import { TextInput } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Inputs = {
  name: string;
  price: number;
  type: string;
};
const AddTestPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [page, setPage] = useState<number>(1);
  const [totalTest, setTotalTest] = useState<number>(0);
  const [limit, setLimit] = useState<number>(100);
  const [tests, setTests] = useState([{} as any]);
  const [testLen, setTestLen] = useState<number>(0);
  useEffect(() => {
    const loadTests = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/test?page=${page}&limit=${limit}`,
          { withCredentials: true }
        );

        const data = response.data;

        setTests(data?.data?.items);
        setTotalTest(data?.data?.totalItems);

        reset();
      } catch (error: any) {
        Swal.fire({
          title: "Failed to Load",
          text: `${error.message}`,
          icon: "error",
        });
        console.log(`Error Occurred`);
      }
    };
    loadTests();
  }, [limit, page, reset, setTests]);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const p = data.price;
    data.price = parseInt(data.price.toString());
    console.log(data);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/test`,

        data,
        {
          withCredentials: true,
        }
      );

      //
      await Swal.fire({
        title: "Success!",
        text: `${response?.data?.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      });

      // Check if the "token" cookie exists
    } catch (err: any) {
      if (err.response.status === 422) {
        await Swal.fire({
          title: "Error!",
          text: `Validation Error`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        await Swal.fire({
          title: "Error!",
          text: `Error Occurred due to ${err.message}`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };
  function addTests(testName?: string) {
    setTests((t) => {
      return [
        ...t,
        {
          name: testName,
          type: "",
          price: "",
        },
      ];
    });
    if (testName) setTotalTest((t) => t + 1);
  }
  const handleTypeChange = (index: number, type: string) => {
    setTests((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], type: type };
      console.log(updatedItems);
      return updatedItems;
    });
  };
  const handleNameChange = (index: number, name: string) => {
    setTests((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], name: name };
      return updatedItems;
    });
  };
  const handlePriceChange = (index: number, price: string) => {
    setTests((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], price: parseInt(price) };
      return updatedItems;
    });
  };
  const saveTests = async () => {
    console.log(tests);
    const filterTests = tests
      .filter(
        (test) =>
          test.name !== undefined &&
          test.name.trim() !== "" &&
          test.price !== undefined &&
          !isNaN(test.price) &&
          test.type !== undefined &&
          test.type.trim() !== ""
      )
      .map(({ name, type, price }) => ({
        name,
        type,
        price: parseInt(price as string),
      }));
    if (filterTests)
      for (const test of filterTests) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/test`,
            test,
            {
              withCredentials: true,
            }
          );

          toast.success(`Added Test ${test.name} of type ${test.type}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });

          // Check if the "token" cookie exists
        } catch (err: any) {
          if (err.response.status === 422) {
            await Swal.fire({
              title: "Error!",
              text: `Validation Error`,
              icon: "error",
              confirmButtonText: "Ok",
            });
          } else if (err.response.status === 500) {
            await Swal.fire({
              title: "Error!",
              text: `Same Test with Same type already exists`,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        }
      }

    console.log(filterTests);
  };
  return (
    <div className="p-10  ">
      <h1 className="font-bold my-4 text-center text-4xl">Add Test</h1>
      <div>
        <ToastContainer className="h-[100px]" />
      </div>
      <h1 className="text-3xl my-5">Search in the database </h1>
      <div className="flex rounded-md px-10 py-3 gap-5 bg-[#F1F3F5] items-center">
        <TextInput
          // onChange={(e) => setSearchParam(e.target.value)}
          icon={HiSearch}
          id="email4"
          placeholder="Search by Name"
          required
          type="email"
          className="w-[40%]"
        />
      </div>
      <div className="grid my-10 gap-3 font-semibold text-xl grid-cols-3 w-[100%] mx-auto text-center">
        <p>Name</p>
        <p>Type</p>
        <p>Price</p>
      </div>
      {tests.map((t, index) => {
        return (
          <div
            className="grid grid-cols-3 gap-3 my-4 w-[100%] mx-auto text-center"
            key={index}
          >
            <div className="grid grid-cols-4 w-[50%] mx-auto justify-center items-center gap-2">
              <p>
                {!isNaN(t.price) &&
                  t.price.toString().trim() !== "" &&
                  t.type &&
                  t.name && (
                    <span className="w-[30px]">
                      {" "}
                      <AiFillCheckCircle className="text-2xl text-green-500 cursor-pointer"></AiFillCheckCircle>
                    </span>
                  )}
              </p>
              <p>
                {t.name && (
                  <span className="w-[30px]">
                    {" "}
                    <AiOutlinePlusSquare
                      onClick={() => {
                        addTests(t.name);
                      }}
                      className="text-2xl cursor-pointer"
                    ></AiOutlinePlusSquare>
                  </span>
                )}
              </p>

              <input
                className="inputStyle col-span-2 block mx-auto !w-[100%] px-5"
                placeholder="Name"
                type="Name"
                readOnly={index < totalTest}
                defaultValue={t.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
              />
            </div>

            <div className="relative">
              <input
                className="inputStyle block mx-auto !w-[60%] px-5"
                placeholder="Type"
                onChange={(e) => handleTypeChange(index, e.target.value)}
                type="text"
              />
            </div>
            <div className="relative">
              <input
                className="inputStyle block mx-auto !w-[60%] px-5"
                placeholder="Price"
                onChange={(e) => handlePriceChange(index, e.target.value)}
                type="number"
              />
            </div>
          </div>
        );
      })}

      <button
        onClick={() => {
          addTests();
        }}
        className="btn bg-black flex justify-start"
      >
        Add a New Test
      </button>
      <div className="flex justify-center">
        <button onClick={saveTests} className="btn bg-green-500">
          Save{" "}
        </button>
      </div>
    </div>
  );
};

export default AddTestPage;
