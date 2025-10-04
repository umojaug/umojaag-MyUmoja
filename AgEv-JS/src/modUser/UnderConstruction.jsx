import React from "react";
import TopHeader from "../components/TopHeader";

function UnderConstruction() {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Under Construction" btn="none" />
      <div>
        We are completing this feature and will release in the near future.
      </div>
    </div>
  );
}

export default UnderConstruction;
