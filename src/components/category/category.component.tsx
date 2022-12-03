import React from "react";

import { trpc } from "../../utils/trpc";

import Alert from "../alert/alert.component";
import Loader from "../loader/loader.component";
import CategoryTable from "./category-table/category-table.component";

const Category: React.FC = () => {
  const { data, isLoading, error, refetch } = trpc.category.getAll.useQuery();

  const handleDeleteCategory = (categoryId: string) => {
    refetch();
  };

  const handleEditCategory = (categoryId: string) => {
    refetch();
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <h1 className="mb-6 text-5xl font-extrabold leading-normal text-gray-700">
          Categories
        </h1>
      </div>
      <div className="mb-4 flex w-full items-center justify-between">
        {isLoading ? <Loader /> : null}
      </div>
      {error ? <Alert message={error.message} /> : null}
      <CategoryTable
        data={data}
        onDeleteRow={handleDeleteCategory}
        onEditRow={handleEditCategory}
      />
    </div>
  );
};

export default Category;
