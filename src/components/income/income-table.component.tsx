import React, { useMemo, useState } from "react";
import type { Category, Income } from "@prisma/client";
import type { Column, Row } from "../../types/types";
import { formatDate, numWithCommas } from "../../utils/shared";
import Table from "../table/table.component";
import EditIconButton from "../buttons/edit-icon-button.component";
import DeleteIconButton from "../buttons/delete-icon-button.component";
import ConfirmationModal from "../confirmation-modal/confirmation-modal.component";

const COLUMNS: Column[] = [
  {
    key: "date",
    name: "Date",
    align: "left",
  },
  {
    key: "name",
    name: "Name",
    align: "left",
  },
  {
    key: "category",
    name: "Category",
    align: "left",
  },
  {
    key: "value",
    name: "Amount",
    align: "right",
  },
  {
    key: "",
    name: "",
    align: "center",
  },
];

type Props = {
  loading: boolean;
  data:
    | (Income & {
        category: Category;
      })[]
    | null
    | undefined;
  onEditRow: (rowId: string) => void;
  onDeleteRow: (rowId: string) => void;
};

const IncomeTable: React.FC<Props> = ({
  loading,
  data,
  onEditRow,
  onDeleteRow,
}) => {
  const [selectedRowId, setSelectedRowid] = useState<string | null>(null);

  const handleDeleteRow = () => {
    if (!selectedRowId) return;
    onDeleteRow(selectedRowId);
    setSelectedRowid(null);
  };

  const rows: Row[] = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.map(
      ({ id, name, date, value, category: { name: categoryName } }) => ({
        id,
        values: [
          {
            value: formatDate(date),
            align: "left",
          },
          {
            value: name,
            align: "left",
          },
          {
            value: categoryName,
            align: "left",
          },
          {
            value: numWithCommas(value),
            align: "right",
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
      })
    );
  }, [data]);

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

export default IncomeTable;
