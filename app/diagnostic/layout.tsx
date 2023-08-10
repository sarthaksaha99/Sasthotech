import React from "react";
import AdminSideBar from "./(components)/Sidebar";
import { AdminProvider } from "@/context/AdminContext";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminProvider>
      <div className="flex ">
        <AdminSideBar></AdminSideBar>
        <main className="w-full">{children}</main>
      </div>
    </AdminProvider>
  );
};

export default AdminLayout;
