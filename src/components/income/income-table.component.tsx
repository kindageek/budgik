import React, { useMemo, useState } from "react";
import type { Category, Income } from "@prisma/client";
import type { Column } from "../../types/types";

import ConfirmationModal from "../confirmation-modal/confirmation-modal.component";
import TableContainer from "../table/table-container.component";
import TableHead from "../table/table-head.component";
import IncomeTableRow from "./income-table-row.component";
import EmptyTableRow from "../table/empty-table-row.component";
import { formatDate, removeDuplicates } from "../../utils/shared";

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

type IncomeType = Income & {
  category: Category;
};

interface GroupedIncomes {
  [key: string]: IncomeType[];
}

type Props = {
  tableRef: React.MutableRefObject<null>;
  loading: boolean;
  data: IncomeType[] | null | undefined;
  onEditRow: (rowId: string) => void;
  onDeleteRow: (rowId: string) => void;
  onDuplicateRow: (rowId: string) => void;
};

const IncomeTable: React.FC<Props> = ({
  tableRef,
  loading,
  data,
  onEditRow,
  onDeleteRow,
  onDuplicateRow,
}) => {
  const rows: GroupedIncomes = useMemo(() => {
    if (!data || data.length === 0) return {};
    const res: GroupedIncomes = {};
    const dates: string[] = removeDuplicates(
      data.map((income) => formatDate(income.date))
    );
    for (const date of dates) {
      const incomes: IncomeType[] = data.filter(
        (income) => formatDate(income.date) === date
      );
      res[date] = incomes;
    }
    return res;
  }, [data]);

  const dates = Object.keys(rows).sort(
    (a, b) => new Date(a).valueOf() - new Date(b).valueOf()
  );

  const [selectedRowId, setSelectedRowid] = useState<string | null>(null);

  const handleDeleteRow = () => {
    if (!selectedRowId) return;
    onDeleteRow(selectedRowId);
    setSelectedRowid(null);
  };

  return (
    <>
      <TableContainer tableRef={tableRef}>
        <TableHead columns={COLUMNS} />
        <tbody>
          {dates?.length > 0 ? (
            dates.map((date) => {
              const incomes = rows[date];
              return incomes?.map((income, index) => (
                <IncomeTableRow
                  key={income.id}
                  row={income}
                  date={date}
                  isFirstRow={index === 0}
                  size={incomes?.length}
                  onEditRow={onEditRow}
                  onDeleteRow={setSelectedRowid}
                  onDuplicateRow={onDuplicateRow}
                />
              ));
            })
          ) : (
            <EmptyTableRow loading={loading} />
          )}
        </tbody>
      </TableContainer>
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
