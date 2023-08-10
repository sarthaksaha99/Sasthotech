import React from "react";
import styles from "./../../styles/styles.module.css";
export default function FormCard({
  children,
  currentStep,
  prevFormStep,
}: {
  children: React.ReactNode;
  currentStep: number;
  prevFormStep: () => void;
}) {
  return (
    <div className={`${styles.formCard} md:w-[70%] w-[95%] lg:w-[40%]`}>
      {currentStep < 4 && (
        <>
          {currentStep > 0 && (
            <button
              className={styles.back}
              onClick={prevFormStep}
              type="button"
            >
              back
            </button>
          )}

          <span className={styles.steps}>Step {currentStep + 1} of 4</span>
        </>
      )}
      {children}
    </div>
  );
}
