"use client";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiPencil } from "react-icons/hi";
import Swal from "sweetalert2";
import UserInfo from "../diagnostic/(components)/Account/UserInfo";
import UserUpdate from "../diagnostic/(components)/Account/UserUpdate";
import PasswordUpdate from "../diagnostic/(components)/Account/PasswordUpdate";
type passwordUpdate = {
  password: string;
  oldPassword: string;
};
type DgUpdate = {
  name?: string;
  address?: string;
  logo?: string;
};
const AccountPage = () => {
  const [isDgUpdate, setDgUpdate] = useState(true);
  const [isUserUpdate, setUserUpdate] = useState(true);
  const [diagnosticInfo, setDiagnosticInfo] = useState({} as any);
  const [userInfo, setUserInfo] = useState({} as any);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    async function loadUserInfo() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`,
          { withCredentials: true }
        );

        //  setDiagnosticInfo(newObj);
        setUserInfo(response.data.data);
      } catch (err: any) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error loading user info due to ${err.message}`,
        });
      }
    }
    loadUserInfo();
  }, []);
  return (
    <div className="h-[100vh] bg-[#E9E7E7] flex flex-col ">
      <div className="w-[70%] px-3 py-2 my-5 mx-auto bg-white rounded-md">
        <h1 className="text-2xl font-semibold my-6">Account Settings</h1>

        <div>
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold">User Information</h1>
            <p
              onClick={() => setUserUpdate(!isUserUpdate)}
              className="flex gap-1 items-center border-[2px] px-3 py-2 rounded-xl border-gray-300"
            >
              {" "}
              <HiPencil className="text-lg"></HiPencil> Update
            </p>
          </div>
          {isUserUpdate ? (
            <UserInfo userInfo={userInfo}></UserInfo>
          ) : (
            <UserUpdate userInfo={userInfo} userRole={user.role}></UserUpdate>
          )}
        </div>
        <div>
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold">Passwords</h1>
          </div>
          <PasswordUpdate></PasswordUpdate>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
