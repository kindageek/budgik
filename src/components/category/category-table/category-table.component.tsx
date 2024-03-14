import React, { useState } from "react";

import type { Column, Row } from "../../../types/types";
import type { Category, CategoryType } from "@prisma/client";

import Table from "../../table/table.component";
import EditIconButton from "../../buttons/edit-icon-button.component";
import DeleteIconButton from "../../buttons/delete-icon-button.component";
import ConfirmationModal from "../../confirmation-modal/confirmation-modal.component";
import { toTitleCase } from "../../../utils/shared";
import ExpensesTableRowActions from "components/expenses/expenses-table/expenses-table-row-actions.component";

const COLUMNS: Column[] = [
  {
    key: "name",
    name: "Name",
    align: "left",
  },
  {
    key: "type",
    name: "Type",
    align: "left",
  },
  {
    key: "",
    name: "",
    align: "center",
  },
];

type Props = {
  tab: CategoryType;
  data: Category[] | null | undefined;
  onEditRow: (rowId: string) => void;
  onDeleteRow: (rowId: string) => void;
  loading?: boolean;
};

const CategoryTable: React.FC<Props> = ({
  tab,
  data,
  onEditRow,
  onDeleteRow,
  loading = false,
}) => {
  const [selectedRowId, setSelectedRowid] = useState<string | null>(null);

  const handleDeleteRow = () => {
    if (!selectedRowId) return;
    onDeleteRow(selectedRowId);
    setSelectedRowid(null);
  };

  const rows: Row[] =
    data && data.length > 0
      ? data?.map(({ name, type, id }) => ({
          id,
          values: [
            {
              value: name,
              width: "50%",
            },
            {
              value: toTitleCase(type.toString()),
              width: "40%",
            },
            {
              value: (
                <ExpensesTableRowActions
                  onEditRow={() => onEditRow(id)}
                  onDeleteRow={() => setSelectedRowid(id)}
                />
              ),
              align: "center",
            },
          ],
        }))
      : [];

  return (
    <>
      <Table
        columns={COLUMNS}
        rows={rows}
        loading={loading}
        desktopOnly={false}
      />
      <ConfirmationModal
        open={selectedRowId !== null}
        onClose={() => setSelectedRowid(null)}
        onSubmit={handleDeleteRow}
        title="Are you sure you want to delete this row?"
        subtitle={`All your ${tab.toLowerCase()}s with this category will be lost.`}
      />
    </>
  );
};

export default CategoryTable;
