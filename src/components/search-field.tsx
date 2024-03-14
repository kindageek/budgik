import { useEffect, useState, type FC } from "react";
import { IoSearch as SearchIcon } from "react-icons/io5";

interface Props {
  defaultValue: string;
  onSubmit: (query: string) => void;
}

const SearchField: FC<Props> = ({ onSubmit, defaultValue }) => {
  const [value, setValue] = useState(defaultValue || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new FormData(e.currentTarget).get("search") as string;
    onSubmit(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value.length > 0 && e.target.value.length === 0) {
      onSubmit("");
    }
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <form className="group relative w-full" onSubmit={handleSubmit}>
      <input
        className="h-[34px] w-full rounded-lg border border-gray-300 bg-white py-2 pl-2 pr-8 text-sm leading-4 text-gray-600 focus:border-secondary-dark focus:outline-none group-hover:border-secondary-dark md:h-[38px] md:py-2.5"
        type="search"
        name="search"
        placeholder="Search by name"
        value={value}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="absolute right-0 top-[50%] translate-y-[-50%] rounded-lg p-2 text-xl text-gray-500 hover:text-gray-600"
      >
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchField;
