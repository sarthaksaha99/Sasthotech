"use client";
import React, { useContext, useEffect } from "react";
import SuperAdminSideBar from "./(components)/SuperAdminSideBar";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { DiagnosticProvider } from "@/context/DiagnosticContext";

const SuperAdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      // router.push("/");
    }
  }, [isLoggedIn, router]);
  return (
    <DiagnosticProvider>
      <div className="flex">
        <SuperAdminSideBar></SuperAdminSideBar>
        <main className="w-full">{children}</main>
      </div>
    </DiagnosticProvider>
  );
};

export default SuperAdminLayout;
