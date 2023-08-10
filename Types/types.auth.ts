import { Dispatch, SetStateAction } from "react";
import { IDoctorItem2 } from "./types.doctor";

export interface IAuthContext {
  login: (param: IUser, param2?: IDoctorItem2[]) => void;
  logout: () => void;
  isLoggedIn: boolean;
  user: IUser;
  diagnosticInfo: IDiagnostic;
  setDiagnosticInfo: Dispatch<SetStateAction<IDiagnostic>>;

  doctors: IDoctorItem2[];
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}
export interface IDiagnostic {
  name: string;
  id: string;
  address: string;
  logo: string;
  division: string;
}
