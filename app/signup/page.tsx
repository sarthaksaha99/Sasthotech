"use client";
import { useState } from "react";
import Head from "next/head";

import styles from "./../styles/styles.module.css";

// import {
//   BillingInfo,
//   ConfirmPurchase,
//   PersonalInfo,
// } from "../components/Forms";
// import FormCompleted from "../components/FormCompleted";
import FormCard from "../(components)/forms/FormCard";
import AuthInfo from "../(components)/forms/AuthInfo";
import FormProvider from "@/context/formcontext";
import InstitutionInfo from "../(components)/forms/InstitutionInfo";
import DoctorList from "../(components)/forms/DoctorList";
import TestList from "../(components)/forms/TestList";

const App = () => {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  return (
    <FormProvider>
      <div className={styles.container}>
        <h1 className="text-center">Sign Up to Update your workflow</h1>
        <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
          {formStep === 0 && (
            <AuthInfo formStep={formStep} nextFormStep={nextFormStep} />
          )}
          {formStep === 1 && (
            <InstitutionInfo formStep={formStep} nextFormStep={nextFormStep} />
          )}

          {formStep === 2 && (
            <DoctorList formStep={formStep} nextFormStep={nextFormStep} />
          )}
          {formStep === 3 && (
            <TestList formStep={formStep} nextFormStep={nextFormStep} />
          )}
          {formStep > 3 && (
            <div>Thanks for your patience . Please wait till confirmation</div>
          )}
        </FormCard>
      </div>
    </FormProvider>
  );
};

export default App;
