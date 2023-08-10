"use client";
import { IDiagnostic } from "@/Types/type.diagnostic";
import { IDoctorItem, IDoctorItem2 } from "@/Types/types.doctor";
import { Dispatch, SetStateAction, createContext, useState } from "react";
type IDgCcontext = {
  diagnostics: IDiagnostic[];
  setDiagnostics: Dispatch<SetStateAction<IDiagnostic[]>>;
  doctors: IDoctorItem2[];
  setDoctors: Dispatch<SetStateAction<IDoctorItem2[]>>;
};
export const DiagnosticContext = createContext<IDgCcontext>({} as IDgCcontext);
export const DiagnosticProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [diagnostics, setDiagnostics] = useState<IDiagnostic[]>([
    {} as IDiagnostic,
  ]);
  const [doctors, setDoctors] = useState<IDoctorItem2[]>([{} as IDoctorItem2]);

  return (
    <DiagnosticContext.Provider
      value={{ diagnostics, setDiagnostics, doctors, setDoctors }}
    >
      {children}
    </DiagnosticContext.Provider>
  );
};
