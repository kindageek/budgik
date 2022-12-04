import React from "react";
import type { Column } from "../../../types/types";

const COLUMNS: Column[] = [
  {
    key: "name",
    name: "Name",
    align: "left",
  },
  {
    key: "",
    name: "",
    align: "center",
  },
];

const CategoryTableHead: React.FC = () => {
  return (
    <thead className="sticky top-0 left-0 w-full bg-gray-100 text-xs uppercase text-gray-900 shadow dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {COLUMNS.map(({ name, align }, index) => (
          <th key={index} align={align} scope="col" className="py-3 px-6">
            {name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CategoryTableHead;
