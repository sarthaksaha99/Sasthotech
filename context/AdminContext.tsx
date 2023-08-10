"use client";
import { IAdminTest } from "@/Types/type.admintest";
import { IReceptionist } from "@/Types/type.receptionist";
import { IDoctorItem2 } from "@/Types/types.doctor";

import { Dispatch, SetStateAction, createContext, useState } from "react";
type IAdminContext = {
  tests: IAdminTest[];
  setTests: Dispatch<SetStateAction<IAdminTest[]>>;
  adminDoctors: IDoctorItem2[];
  setAdminDoctors: Dispatch<SetStateAction<IDoctorItem2[]>>;
  outSideDoctors: any[];
  setOutSideDoctors: Dispatch<SetStateAction<any[]>>;
  receptionist: IReceptionist[];

  setReceptionist: Dispatch<SetStateAction<IReceptionist[]>>;
};
export const AdminContext = createContext<IAdminContext>({} as IAdminContext);
export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [tests, setTests] = useState<IAdminTest[]>([{} as IAdminTest]);
  const [adminDoctors, setAdminDoctors] = useState<IDoctorItem2[]>([
    {} as IDoctorItem2,
  ]);
  const [outSideDoctors, setOutSideDoctors] = useState([{} as any]);
  const [receptionist, setReceptionist] = useState<IReceptionist[]>([
    {} as IReceptionist,
  ]);

  return (
    <AdminContext.Provider
      value={{
        tests,
        setTests,
        adminDoctors,
        setAdminDoctors,
        receptionist,
        setReceptionist,
        outSideDoctors,
        setOutSideDoctors,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
