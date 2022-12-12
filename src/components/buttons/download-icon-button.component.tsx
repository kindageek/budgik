import React from "react";
import { AiOutlineDownload } from "react-icons/ai";

type Props = {
  onClick?: () => void;
};

const DownloadIconButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border p-2.5 hover:bg-gray-100"
      title="Download as Excel"
    >
      <AiOutlineDownload size={20} />
    </button>
  );
};

export default DownloadIconButton;
