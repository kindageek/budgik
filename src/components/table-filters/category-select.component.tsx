import React from "react";
import Dropdown from "../dropdown/dropdown.component";

type Props = {
  category: string;
  categories: string[];
  onSelect: (categoryId: string) => void;
};

const CategorySelect: React.FC<Props> = ({
  category,
  categories,
  onSelect,
}) => {
  const active = category !== "All categories";
  return (
    <div className="flex w-max-content min-w-[12rem] items-center">
      <Dropdown
        active={active}
        value={category}
        values={categories}
        onChange={onSelect}
        fullWidth
      />
    </div>
  );
};

export default CategorySelect;
