import React, { useState } from "react";

import type { Column, Row } from "../../../types/types";
import type { Category } from "@prisma/client";

import Table from "../../table/table.component";
import EditIconButton from "../../buttons/edit-icon-button.component";
import DeleteIconButton from "../../buttons/delete-icon-button.component";
import ConfirmationModal from "../../confirmation-modal/confirmation-modal.component";
import { toTitleCase } from "../../../utils/shared";

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
  data: Category[] | undefined;
  onEditRow: (rowId: string) => void;
  onDeleteRow: (rowId: string) => void;
  loading?: boolean;
};

const CategoryTable: React.FC<Props> = ({
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
                <div className="flex items-center justify-center">
                  <div className="mr-4 flex items-center justify-center">
                    <EditIconButton onClick={() => onEditRow(id)} />
                  </div>
                  <div className="flex items-center justify-center">
                    <DeleteIconButton onClick={() => setSelectedRowid(id)} />
                  </div>
                </div>
              ),
              align: "center",
            },
          ],
        }))
      : [];

  return (
    <>
      <Table columns={COLUMNS} rows={rows} loading={loading} />
      <ConfirmationModal
        open={selectedRowId !== null}
        onClose={() => setSelectedRowid(null)}
        onSubmit={handleDeleteRow}
        title="Are you sure you want to delete this row?"
      />
    </>
  );
};

export default CategoryTable;
