import React from "react";
import AppLoader from "../global-components/loader";

const LoaderWrapper: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full mt-10">
      <AppLoader />
    </div>
  );
};

export default LoaderWrapper;
