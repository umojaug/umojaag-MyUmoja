import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const Clock = () => {
  let time = new Date();
  const [curretTime, setCurretTime] = useState(time);

  const updateTime = () => {
    let time = new Date();
    setCurretTime(time);
  };

  useEffect(() => {
    const updatePostInfo = setInterval(updateTime, 1000);
    return () => clearInterval(updatePostInfo);
  }, []);

  return (
    <span className="font-bold text-xs">
      Time : {format(new Date(curretTime), "dd-MMM-yyy hh:mm aa")}
    </span>
  );
};

export default Clock;
