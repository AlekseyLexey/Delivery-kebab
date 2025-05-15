import React from "react";
import "./input.scss";

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
