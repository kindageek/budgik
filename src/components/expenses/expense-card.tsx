import React, { useState } from "react";
import type { Category, Expense } from "@prisma/client";
import * as Accordion from "@radix-ui/react-accordion";
import { numWithCommas } from "utils/shared";
import ExpensesTableRowActions from "./expenses-table/expenses-table-row-actions.component";
import { IoChevronDownOutline as ArrowDown } from "react-icons/io5";

type Props = {
  data: (Expense & {
    category: Category;
  })[];
  date: string;
  sum: number;
  onEditRow: (rowId: string) => void;
  onDeleteRow: (rowId: string) => void;
  onDuplicateRow: (rowId: string, date: string) => void;
};

const ExpenseCard: React.FC<Props> = ({
  data,
  date,
  sum,
  onEditRow,
  onDeleteRow,
  onDuplicateRow,
}) => {
  const [openState, setOpenState] = useState("");
  const open = openState === date;

  const formatDate = (date: string) => {
    const d = new Date(date);
    const month = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();
    return `${month} ${day}`;
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border py-2 px-4 shadow transition-all">
      <Accordion.Root
        type="single"
        collapsible
        value={openState}
        onValueChange={setOpenState}
      >
        <Accordion.Item value={date}>
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center">
              <div className="flex w-full items-center justify-between">
                <h3 className="text-md font-semibold">{formatDate(date)}</h3>
                <h3 className="text-md font-semibold">${numWithCommas(sum)}</h3>
              </div>
              <span className="p-2">
                <ArrowDown
                  fontSize="16"
                  aria-hidden
                  className={`accordion-arrow transition-all duration-300 ease-in-out ${
                    open && "rotate-180 transform"
                  }`}
                />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <ul className="flex flex-col gap-1">
              {data.map((expense) => (
                <li
                  className="flex items-center justify-between"
                  key={expense.id}
                >
                  <div className="grid w-full grid-cols-4 gap-1 text-sm">
                    <h6 className="col-span-2 font-medium">{expense.name}</h6>
                    <p className="">{expense.category.name}</p>
                    <p className="text-right">
                      ${numWithCommas(expense.value)}
                    </p>
                  </div>
                  <ExpensesTableRowActions
                    rowDate={date}
                    onEditRow={() => onEditRow(expense.id)}
                    onDeleteRow={() => onDeleteRow(expense.id)}
                    onDuplicateRow={(date) => onDuplicateRow(expense.id, date)}
                  />
                </li>
              ))}
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
};

export default ExpenseCard;
