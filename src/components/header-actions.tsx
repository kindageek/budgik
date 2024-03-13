import type { FC, PropsWithChildren } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Loader from "./loader/loader.component";
import SearchField from "./search-field";
import DownloadIconButton from "./buttons/download-icon-button.component";

interface Props {
  loading: boolean;
  total: string;
  defaultSearchValue: string;
  onSearch: (query: string) => void;
  table: {
    ref: React.MutableRefObject<HTMLTableElement | null>;
    filename: string;
    sheetName: string;
  };
  isDirty?: boolean;
  onReset?: () => void;
}

const HeaderActions: FC<PropsWithChildren<Props>> = ({
  total,
  table,
  loading,
  onSearch,
  isDirty,
  onReset,
  defaultSearchValue,
  children,
}) => {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center">
        <h5 className="mr-2 text-lg font-semibold text-gray-800 sm:text-xl">
          Total:
        </h5>
        <p className="text-xl font-medium text-black sm:text-2xl">{total}</p>
      </div>
      <div className="flex w-full items-center gap-4 sm:w-auto">
        {loading && <Loader />}
        {isDirty && (
          <button
            className="background-transparent whitespace-nowrap rounded-lg px-4 py-2 text-sm text-secondary-dark outline-none transition-all duration-150 ease-linear hover:bg-secondary-100 focus:outline-none disabled:text-gray-300 disabled:hover:bg-transparent"
            type="button"
            onClick={onReset}
          >
            Reset Filters
          </button>
        )}
        <SearchField onSubmit={onSearch} defaultValue={defaultSearchValue} />
        {table.ref && (
          <DownloadTableExcel
            filename={table.filename}
            sheet={table.sheetName}
            currentTableRef={table.ref?.current}
          >
            <DownloadIconButton />
          </DownloadTableExcel>
        )}
        {children}
      </div>
    </div>
  );
};

export default HeaderActions;
