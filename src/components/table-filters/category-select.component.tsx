import React, { useContext } from "react";
import SnackbarContext from "context/snackbar.context";
import { trpc } from "utils";
import Dropdown from "../dropdown/dropdown.component";

type Props = {
  type: "EXPENSE" | "INCOME";
  category: string;
  categories: string[];
  onSelect: (categoryId: string) => void;
  onAddComplete?: () => void;
  disableAdd?: boolean;
  showActive?: boolean;
};

const CategorySelect: React.FC<Props> = ({
  type,
  category,
  categories,
  onSelect,
  onAddComplete = null,
  disableAdd = false,
  showActive = true,
}) => {
  const { openSnackbar } = useContext(SnackbarContext);
  const active = category !== "All categories";

  const { mutateAsync: addCategory } = trpc.category.add.useMutation({
    onSuccess: (data) => {
      openSnackbar({ msg: data.message, type: "success" });
      if (!!onAddComplete && !disableAdd) {
        onAddComplete();
      }
    },
  });

  const handleAddCategory = (name: string) => {
    if (disableAdd) return;
    addCategory({ name, type });
  };

  return (
    <div className="w-max-content flex min-w-[12rem] items-center">
      <Dropdown
        active={active}
        value={category}
        values={categories}
        onChange={onSelect}
        showActive={showActive}
        fullWidth
        onAdd={disableAdd ? undefined : handleAddCategory}
      />
    </div>
  );
};

export default CategorySelect;
