"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  Button,
  CustomFlowbiteTheme,
  Dropdown,
  Flowbite,
  Navbar,
} from "flowbite-react";
import logo from "./../../../Images/sasthotech.png";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { Bentham } from "next/font/google";
import { IDiagnostic } from "@/Types/types.auth";

const customTheme: CustomFlowbiteTheme = {
  navbar: {
    collapse: {
      base: "w-full md:block md:w-auto",
      list: "mt-4 flex flex-col md:items-center md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
      hidden: {
        on: "hidden",
        off: "",
      },
    },
    link: {
      base: "block py-2 pr-4 pl-3 text-center md:px-2 md:py-1",
      active: {
        on: "border-[white] !text-black border-b-[#4A4545] border-[2px] text-black   dark:text-white  md:text-cyan-700",
        off: "border-b border-gray-100 !text-black  text-gray-700 hover:bg-gray-500 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
      },
      disabled: {
        on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        off: "",
      },
    },
  },
};
const Header = () => {
  const router = useRouter();
  const pages = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Billing",
      path: "/billing",
    },
    {
      name: "Doctors",
      path: "/doctors",
    },
  ];
  const { isLoggedIn, logout, login, user, setDiagnosticInfo } =
    useContext(AuthContext);
  const pathname = usePathname();
  async function userLogOut() {
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
      console.log("Error", err);
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
      console.log(user.role);

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
          console.log(data?.data);

          login(data?.data);
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
  }, []);
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Navbar
        className=" navigation shadow-xl bg-gray-50"
        fluid={true}
        rounded={true}
      >
        <Navbar.Brand className="ml-10" href="/">
          <Image
            src={logo}
            width={200}
            height={80}
            alt="Sasthotech Logo"
          ></Image>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {isLoggedIn ? (
            <Button
              onClick={userLogOut}
              className="!bg-[#4A4545] my-3 font-semibold text-lg uppercase lg:my-0"
            >
              Log Out
            </Button>
          ) : (
            <>
              <Button className="!bg-[#4A4545] my-3  font-semibold text-lg uppercase lg:my-0">
                <Link href="/login"> Log In</Link>
              </Button>
            </>
          )}
          {!user.role || user.role === "superadmin" ? (
            <Navbar.Link as={Link} href="/" active={"/" === pathname}>
              Home
            </Navbar.Link>
          ) : (
            <>
              {pages.map(({ name, path }) => (
                <Navbar.Link
                  as={Link}
                  key={path}
                  href={path}
                  active={path === pathname}
                >
                  {name ?? path.substring(path.lastIndexOf("/") + 1)}
                </Navbar.Link>
              ))}
              {user.role === "admin" ? (
                <Navbar.Link
                  as={Link}
                  href="/diagnostic"
                  active={"/diagnostic" === pathname}
                >
                  Dashboard
                </Navbar.Link>
              ) : (
                <Dropdown className="text-black " label="Dashboard">
                  <Dropdown.Item>
                    <Link href="/account">Profile</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href="/billList">Bill List</Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    {" "}
                    <Link href="/expenses">Add Expenses</Link>
                  </Dropdown.Item>
                </Dropdown>
              )}
            </>
          )}
          {user.role === "superadmin" ? (
            <Navbar.Link
              as={Link}
              href="/superadmin"
              active={"/superadmin" === pathname}
            >
              Dashboard
            </Navbar.Link>
          ) : (
            ""
          )}
        </Navbar.Collapse>
      </Navbar>
    </Flowbite>
  );
};

export default Header;
