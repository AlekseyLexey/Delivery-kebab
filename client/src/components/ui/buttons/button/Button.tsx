import React from "react";
import "./button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
}

function Button({ buttonText, ...props }: ButtonProps) {
  return (
    <button className="button" {...props}>
      {buttonText}
    </button>
  );
}

export default Button;
