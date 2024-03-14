import React from "react";
import { BiSad } from "react-icons/bi";

type Props = {
  loading?: boolean;
};

const EmptyTableRow: React.FC<Props> = ({ loading = false }) => {
  if (!loading) {
    return (
      <tr className="bg-whiteborder-b">
        <td align="center" className="py-2 px-6" colSpan={100}>
          <div className="flex flex-col items-center justify-center py-4">
            <BiSad size={64} color="grey" />
            <h3 className="mt-4 text-center text-xl font-medium text-gray-500">
              No data
            </h3>
          </div>
        </td>
      </tr>
    );
  }
  return (
    <>
      {Array.from({ length: 15 }).map((_, i) => (
        <tr key={i}>
          <td colSpan={100}>
            <div className="my-0.5 h-9 w-full animate-pulse rounded-lg bg-gray-200"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default EmptyTableRow;
