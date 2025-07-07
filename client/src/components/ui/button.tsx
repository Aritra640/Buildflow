import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export const Button = ({ variant = "default", className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-2xl px-4 py-2 font-medium transition-all duration-200",
        {
          "bg-blue-600 text-white hover:bg-blue-700": variant === "default",
          "border border-gray-400 text-gray-800 hover:bg-gray-100": variant === "outline",
        },
        className
      )}
    />
  );
};

