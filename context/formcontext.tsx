import React, { createContext, useContext, useState } from "react";
import { IFormContextType, IFormData, IDoctor } from "@/Types/types.forms";
export const FormContext = createContext<IFormContextType>(
  {} as IFormContextType
);

export default function FormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<IFormData>({
    email: "",
    password: "",
    institution: "",
    logo: "",
    address: "",
    doctors: [],
    tests: [],
  });
  const setFormValues = (values: Partial<IFormData>) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };
  return (
    <FormContext.Provider value={{ data, setFormValues }}>
      {children}
    </FormContext.Provider>
  );
}

export const useFormData = () => useContext(FormContext);
