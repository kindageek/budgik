import React from "react";

type Props = {
  message: string;
  type?: "success" | "error";
};

const Alert: React.FC<Props> = ({ message, type = "error" }) => {
  return (
    <div
      className="relative my-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
      role="alert"
    >
      <strong className="mr-2 font-bold">{type.toUpperCase()}!</strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default Alert;
