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
import { BiClinic } from "react-icons/bi";
import { GiNurseMale, GiExpense } from "react-icons/gi";
import { VscGist } from "react-icons/vsc";
import logo from "./../../../Images/sasthotech.png";
import { AuthContext } from "@/context/AuthContext";
import Swal from "sweetalert2";
import Image from "next/image";

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
const SuperAdminSideBar = () => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
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
        console.log(data);
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
  const pathname = usePathname();

  useEffect(() => {
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
                width={200}
                height={80}
                alt="Sasthotech Logo"
              ></Image>
            </Link>
            <p className="text-lg my-5"> Super Admin Panel</p>
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
                href="/superadmin"
                active={"/superadmin" === pathname}
                icon={HiHome}
              >
                Home
              </Sidebar.Item>

              <Sidebar.Item
                as={Link}
                href="/dashboard/account"
                active={"/dashboard/account" === pathname}
                icon={GrOverview}
              >
                Overview
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <p className="text-sm text-gray-500">Other Menu</p>
              <Sidebar.Collapse icon={BiClinic} label="Diagnostic">
                <Sidebar.Item
                  as={Link}
                  href="/superadmin/diagnostics"
                  active={"/superadmin/diagnostics" === pathname}
                >
                  All Diagnostics
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  href="/superadmin/diagnostics/createDiagnostics"
                  active={
                    "/superadmin/diagnostics/createDiagnostics" === pathname
                  }
                >
                  Create Diagnostic
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse icon={FaStethoscope} label="Doctors">
                <Sidebar.Item
                  as={Link}
                  href="/superadmin/doctors"
                  active={"/superadmin/doctors" === pathname}
                >
                  All Doctors
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  href="/superadmin/doctors/addDoctors"
                  active={"/superadmin/doctors/addDoctors" === pathname}
                >
                  Add Doctor
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse icon={GrTest} label="Tests">
                <Sidebar.Item
                  as={Link}
                  href="/superadmin/tests"
                  active={"/superadmin/tests" === pathname}
                >
                  All Tests
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  href="/superadmin/tests/createtests"
                  active={"/superadmin/tests/createtests" === pathname}
                >
                  Add Test
                </Sidebar.Item>
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>

            <Sidebar.ItemGroup>
              <p className="text-sm text-gray-500">Account Section</p>
              <Sidebar.Item
                as={Link}
                href="/superadmin/account"
                active={"/superadmin/account" === pathname}
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

export default SuperAdminSideBar;
