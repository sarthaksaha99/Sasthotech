// AuthContext.js
"use client";
import { IAuthContext, IDiagnostic, IUser } from "@/Types/types.auth";
import { IDoctorItem2 } from "@/Types/types.doctor";
import React, { createContext, useState } from "react";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string>("");
  const [diagnosticInfo, setDiagnosticInfo] = useState<IDiagnostic>(
    {} as IDiagnostic
  );
  const [doctors, setDoctors] = useState<IDoctorItem2[]>([{} as IDoctorItem2]);
  const [user, setUser] = useState<IUser>({} as IUser);
  const login = (param: IUser, param2?: IDoctorItem2[]) => {
    // Perform login logic
    setIsLoggedIn(true);
    if (param2) {
      // console.log(param2);

      setDoctors(param2);
    }
    setUser(param);
  };

  const logout = () => {
    setUser({ name: "", id: "", role: "", email: "" });
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
        doctors,
        diagnosticInfo,
        setDiagnosticInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
