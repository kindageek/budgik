import React, { useContext } from "react";
import SnackbarContext from "context/snackbar.context";
import { trpc } from "utils";
import Dropdown from "../dropdown/dropdown.component";

type Props = {
  type: 'EXPENSE' | 'INCOME',
  category: string;
  categories: string[];
  onSelect: (categoryId: string) => void;
  onAddComplete: () => void;
};

const CategorySelect: React.FC<Props> = ({
  type,
  category,
  categories,
  onSelect,
  onAddComplete,
}) => {
  const { openSnackbar } = useContext(SnackbarContext);
  const active = category !== "All categories";

  const {
    mutateAsync: addCategory,
  } = trpc.category.add.useMutation({
    onSuccess: (data) => {
      openSnackbar({ msg: data.message, type: "success" });
      onAddComplete();
    },
  });

  const handleAddCategory = (name: string) => {
    addCategory({ name, type });
  };

  return (
    <div className="w-max-content flex min-w-[12rem] items-center">
      <Dropdown
        active={active}
        value={category}
        values={categories}
        onChange={onSelect}
        fullWidth
        onAdd={handleAddCategory}
      />
    </div>
  );
};

export default CategorySelect;
