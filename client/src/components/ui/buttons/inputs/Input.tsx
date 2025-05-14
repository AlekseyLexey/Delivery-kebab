import React from "react";
import "./input.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
}

function Input({ labelText, ...props }: InputProps) {
  return (
    <div className="input-wrapper">
      <label>
        {labelText}
        <input {...props} />
      </label>
    </div>
  );
}

export default Input;
