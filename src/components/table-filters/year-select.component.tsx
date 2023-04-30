import React, { useEffect, useState } from "react";
import { trpc } from "utils";
import Dropdown from "../dropdown/dropdown.component";

type Props = {
  year: number;
  onSelect: (_year: number) => void;
};

const YearSelect: React.FC<Props> = ({ year, onSelect }) => {
  const {
    data: years,
    refetch,
    isFetched,
    isLoading,
  } = trpc.user.getYears.useQuery();
  const { mutate: addYears } = trpc.user.addYears.useMutation({
    onSuccess: () => {
      setErrorMsg("");
      refetch();
    },
    onError: (error) => {
      setErrorMsg(error.message);
    },
  });
  const [errorMsg, setErrorMsg] = useState("");

  const currentYear = new Date().getFullYear();

  const handleChange = (year: string) => {
    onSelect(parseInt(year));
  };

  const handleAddYear = (value: string) => {
    const year = parseInt(value);
    if (!Number.isInteger(year)) {
      setErrorMsg("Invalid input");
      return;
    }
    addYears({ years: [year] });
  };

  // const handleRemoveYear = (value: string) => {
  //   const year = parseInt(value);
  // };

  useEffect(() => {
    if (!isFetched) return;
    if (years && years.length > 0) return;
    const nextThreeYears = new Array(3).fill(0).map((_, i) => currentYear + i);
    addYears({ years: nextThreeYears });
  }, [years]);

  return (
    <div className="flex max-w-[10rem] items-center w-full">
        <Dropdown
          value={year.toString()}
          values={years ? years?.map((y) => y.toString()) : []}
          onChange={handleChange}
          fullWidth
          onAdd={handleAddYear}
          // onRemove={handleRemoveYear}
          error={errorMsg?.length > 0}
          errorMessage={errorMsg}
        />
    </div>
  );
};

export default YearSelect;
