import React, { useContext, useState } from "react";

import { trpc } from "../../utils/trpc";
import type { Category as ICategory } from "../../types/types";

import Alert from "../alert/alert.component";
import Loader from "../loader/loader.component";
import AddCategory from "./add-category/add-category.component";
import CategoryTable from "./category-table/category-table.component";
import CategoryForm from "./category-form/category-form.component";
import SnackbarContext from "../../context/snackbar.context";

const Category: React.FC = () => {
  const { openSnackbar } = useContext(SnackbarContext);
  const { data, isLoading, error, refetch } = trpc.category.getAll.useQuery();

  const [editCategoryData, setEditCategoryData] = useState<ICategory | null>(
    null
  );

  const {
    mutateAsync: editCategory,
    isLoading: isEditLoading,
    error: editError,
  } = trpc.category.edit.useMutation({
    onSuccess: (data) => {
      openSnackbar({ msg: data.message, type: "success" });
      setEditCategoryData(null);
      refetch();
    },
  });

  const { mutateAsync: deleteCategory } = trpc.category.delete.useMutation({
    onSuccess: (data) => {
      openSnackbar({ msg: data.message, type: "success" });
      refetch();
    },
  });

  const handleAddComplete = (msg: string) => {
    openSnackbar({ msg, type: "success" });
    refetch();
  };

  const handleEditSubmit = (name: string) => {
    if (!editCategoryData?.id) return;
    editCategory({ ...editCategoryData, name });
  };

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategory({ id: categoryId });
  };

  const handleEditCategory = (categoryId: string) => {
    const category = data?.find((c) => c.id === categoryId);
    if (!category) return;
    setEditCategoryData(category);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <h1 className="mb-6 text-5xl font-extrabold leading-normal text-gray-700">
          Categories
        </h1>
        <div className="flex items-center">
          {isLoading ? <Loader /> : null}
          <AddCategory onComplete={handleAddComplete} />
        </div>
      </div>
      {error ? <Alert message={error.message} /> : null}
      <CategoryTable
        data={data}
        onDeleteRow={handleDeleteCategory}
        onEditRow={handleEditCategory}
      />
      {editCategoryData !== null ? (
        <CategoryForm
          data={editCategoryData}
          onClose={() => setEditCategoryData(null)}
          onSubmit={handleEditSubmit}
          errorMessage={editError?.message}
          isLoading={isEditLoading}
        />
      ) : null}
    </div>
  );
};

export default Category;
