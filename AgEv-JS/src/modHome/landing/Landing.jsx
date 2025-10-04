import React from "react";
import CoreValues from "./CoreValues";
import Signin from "./Signin";
import NewWhistleblowing from "./NewWhistleblowing";

export default function Landing() {
  return (
    <div className="max-w-full px-2 sm:px-8 lg:px-[120px] m-auto grid gap-4 md:gap-x-10 md:gap-y-4 grid-cols-1 md:grid-cols-2 md:items-end">
      <div className="md:flex md:flex-col md:justify-end">
        <NewWhistleblowing />
        <Signin />
      </div>
      <div>
        <CoreValues />
      </div>
    </div>
  );
}