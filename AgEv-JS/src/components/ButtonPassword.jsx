import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ButtonPassword = ({ control }) => {
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="flex justify-between form-control bg-white ">
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <input
            {...field}
            placeholder="Password"
            type={passwordShown ? "text" : "password"}
            className="border-0 p-0 outline-none flex-grow"
          />
        )}
      />
      {passwordShown ? (
        <AiOutlineEyeInvisible onClick={togglePassword} size={24} />
      ) : (
        <AiOutlineEye onClick={togglePassword} size={24} />
      )}
    </div>
  );
};

export default ButtonPassword;
