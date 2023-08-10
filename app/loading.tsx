"use client";

import { Spinner } from "flowbite-react";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner aria-label="Success status example" size="xl" />
    </div>
  );
};

export default Loading;
