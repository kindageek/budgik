import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { Category as ICategory, CategoryType } from "@prisma/client";

import { trpc } from "../../utils/trpc";

import Alert from "../alert/alert.component";
import Loader from "../loader/loader.component";
import AddCategory from "./add-category/add-category.component";
import CategoryTable from "./category-table/category-table.component";
import CategoryForm from "./category-form/category-form.component";
import SnackbarContext from "../../context/snackbar.context";
import CategoryTabs from "./category-tabs/category-tabs.component";

const Category: React.FC = () => {
  const router = useRouter();

  const [tab, setTab] = useState<CategoryType>("EXPENSE");
  const { openSnackbar } = useContext(SnackbarContext);
  const { data, isLoading, error, refetch } = trpc.category.getAll.useQuery({
    type: (tab as CategoryType) || "EXPENSE",
  });

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

  const handleEditSubmit = (data: { name: string; type: CategoryType }) => {
    if (!editCategoryData?.id) return;
    editCategory({ ...data, id: editCategoryData.id });
  };

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategory({ id: categoryId });
  };

  const handleEditCategory = (categoryId: string) => {
    const category = data?.find((c) => c.id === categoryId);
    if (!category) return;
    setEditCategoryData(category);
  };

  useEffect(() => {
    setTab(router.query.tab as CategoryType);
  }, [router]);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <h1 className="mb-6 text-5xl font-extrabold leading-normal text-gray-700">
          Categories
        </h1>
        <div className="flex items-center">
          {isLoading ? <Loader /> : null}
          <AddCategory
            tab={tab as CategoryType}
            onComplete={handleAddComplete}
          />
        </div>
      </div>
      <CategoryTabs />
      {error ? <Alert message={error.message} /> : null}
      <CategoryTable
        tab={tab as CategoryType}
        data={data}
        onDeleteRow={handleDeleteCategory}
        onEditRow={handleEditCategory}
      />
      <CategoryForm
        tab={tab as CategoryType}
        open={editCategoryData !== null}
        data={editCategoryData}
        onClose={() => setEditCategoryData(null)}
        onSubmit={handleEditSubmit}
        errorMessage={editError?.message}
        isLoading={isEditLoading}
      />
    </div>
  );
};

export default Category;
