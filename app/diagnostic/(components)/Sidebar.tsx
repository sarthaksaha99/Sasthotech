"use client";

import classNames from "classnames";
import { CustomFlowbiteTheme, Flowbite, Sidebar } from "flowbite-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { HiLogout } from "react-icons/hi";
import { HiUser, HiHome, HiXMark } from "react-icons/hi2";
import { FaStethoscope } from "react-icons/fa";
import { GrTest, GrOverview } from "react-icons/gr";
import logo from "./../../../Images/sasthotech.png";
import { GiNurseMale, GiExpense } from "react-icons/gi";
import { VscGist } from "react-icons/vsc";
import { AuthContext } from "@/context/AuthContext";
import Swal from "sweetalert2";
import Image from "next/image";
import axios from "axios";
import { IDoctorItem2 } from "@/Types/types.doctor";
import { IDiagnostic } from "@/Types/types.auth";
const options = [
  {
    path: "/",
    icon: HiHome,
    text: "Home",
  },
  {
    path: "/",
    icon: HiHome,
    text: "Home",
  },
];

const customTheme: CustomFlowbiteTheme = {
  sidebar: {
    item: {
      base: "group flex items-center font-semibold justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:text-white hover:bg-black",
      active: "!text-white bg-black",
      icon: {
        base: "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-white",
        active: "text-white",
      },
    },
    collapse: {
      button:
        "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75  dark:text-white dark:hover:bg-gray-700",
      label: {
        icon: "h-6 w-6 ",
        base: "ml-3 flex-1 font-semibold  whitespace-nowrap text-left",
      },
    },
  },
};
const SideBar = () => {
  const { login, setDiagnosticInfo } = useContext(AuthContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useContext(AuthContext);
  async function userLogout() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        //   console.log(data);
        logout();
        await Swal.fire({
          title: "Success!",
          text: `${data?.message}`,
          icon: "success",
          confirmButtonText: "Ok",
        });
        router.push("/");
      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (err) {
      await Swal.fire({
        title: "Error!",
        text: `${err}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }
  useEffect(() => {
    async function checkLoginStatus() {
      //  console.log(user.role);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          // console.log(data?.data);
          const response1 = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor`,

            {
              withCredentials: true,
            }
          );
          const allDoctors: IDoctorItem2[] = response1?.data?.data?.items;
          // console.log(allDoctors);
          login(data?.data, allDoctors);
          let diagnosticInfo: IDiagnostic;
          if (data?.data.role !== "superadmin") {
            const response3 = await axios.get(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/diagnostic`,

              {
                withCredentials: true,
              }
            );
            const { id, name, division, logo, address } = response3?.data?.data;
            diagnosticInfo = { id, name, division, logo, address };
            console.log(diagnosticInfo);

            setDiagnosticInfo(diagnosticInfo);
            //console.log(diagnosticeInfo);
          }
        }
      } catch (error) {
        console.log("error");
      }
    }
    checkLoginStatus();
    setShowSidebar(false);
  }, [pathname, setShowSidebar]);

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div
        className={classNames(
          "fixed left-0 top-0 z-20 md:h-auto md:min-h-screen",
          showSidebar
            ? "lt-md:h-[100vh] lt-md:w-64"
            : "lt-md:h-[50px] lt-md:w-[50px]",
          "bg-transparent shadow-xl transition-transform sm:translate-x-0 md:relative  md:w-64"
        )}
      >
        <button
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
          className={classNames(
            showSidebar ? "hidden" : "",
            "rounded-md border-[1px] bg-white p-2 text-black shadow-xl md:hidden"
          )}
        >
          <AiOutlineBars size={32} />
        </button>
        <Sidebar
          className={` ${showSidebar ? "" : "lt-md:hidden"} z-10 h-full  py-2`}
          aria-label="Dashboard sidebar"
        >
          <div className="mb-4  font-semibold">
            <Link
              className="text-black text-3xl hover:text-black lt-md:hidden"
              href="/"
            >
              <Image
                src={logo}
                width={150}
                height={80}
                alt="Sasthotech Logo"
              ></Image>
            </Link>
            <p className="text-lg my-5">Admin Panel</p>
            <div className="flex items-center justify-between md:hidden">
              <span>Menu</span>
              <button
                onClick={() => {
                  setShowSidebar(false);
                }}
              >
                <HiXMark />
              </button>
            </div>
          </div>

          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <p className="text-sm text-gray-500">Main Menu</p>
              <Sidebar.Item
                as={Link}
                href="/diagnostic"
                active={"/diagnostic" === pathname}
                icon={HiHome}
              >
                Home
              </Sidebar.Item>
              <Sidebar.Item
                as={Link}
                href="/diagnostic/expense"
                active={"/diagnostic/expense" === pathname}
                icon={GiExpense}
              >
                Expenses
              </Sidebar.Item>

              <Sidebar.Item
                as={Link}
                href="/diagnostic/billList"
                active={"/diagnostic/billList" === pathname}
                icon={GrOverview}
              >
                BillList
              </Sidebar.Item>
              {/* <Sidebar.Item
                as={Link}
                href="/diagnostic/dailysummary"
                active={"/diagnostic/dailysummary" === pathname}
                icon={VscGist}
              >
                Daily Summary
              </Sidebar.Item> */}
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <p className="text-sm text-gray-500">Other Menu</p>
              <Sidebar.Collapse icon={FaStethoscope} label="Doctors">
                <Sidebar.Item
                  as={Link}
                  href="/diagnostic/doctors"
                  active={"/diagnostic/doctors" === pathname}
                >
                  All Doctors
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  href="/diagnostic/doctors/addDoctors"
                  active={"/diagnostic/doctors/addDoctors" === pathname}
                >
                  Add Doctor
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse icon={GrTest} label="Tests">
                <Sidebar.Item
                  as={Link}
                  href="/diagnostic/tests"
                  active={"/diagnostic/tests" === pathname}
                >
                  All Tests
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  href="/diagnostic/tests/addTests"
                  active={"/diagnostic/tests/addTests" === pathname}
                >
                  Add Test
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse icon={GiNurseMale} label="Receptionist">
                <Sidebar.Item
                  as={Link}
                  href="/diagnostic/pcs"
                  active={"/diagnostic/pcs" === pathname}
                >
                  All Receptionists
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  href="/diagnostic/pcs/addpcs"
                  active={"/diagnostic/pcs/addpcs" === pathname}
                >
                  Add Receptionist
                </Sidebar.Item>
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>

            <Sidebar.ItemGroup>
              <p className="text-sm text-gray-500">Account Section</p>
              <Sidebar.Item
                as={Link}
                href="/diagnostic/account"
                active={"/diagnostic/account" === pathname}
                icon={HiUser}
              >
                Account
              </Sidebar.Item>
              <Sidebar.Item onClick={userLogout} icon={HiLogout}>
                Log Out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </Flowbite>
  );
};

export default SideBar;
