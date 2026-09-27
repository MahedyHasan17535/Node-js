import React from "react";
import { LuChevronDown } from "react-icons/lu";

export type TSortOption = "duration" | "calories" | "rating";

interface ISortDropdownProps {
  value: TSortOption;
  onChange: (value: TSortOption) => void;
}

const SortDropdown = ({ value, onChange }: ISortDropdownProps) => {
  return (
    <label className="relative inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-white">
      <span className="text-muted">Sort By</span>

      <select
         value={value}
        onChange={(e) => onChange(e.target.value as TSortOption)}
        className="appearance-none bg-transparent pr-5 font-semibold text-white outline-none"
      >
        <option value="duration" className="bg-black text-white">Duration</option>
        <option value="calories" className="bg-black text-white">Calories</option>
        <option value="rating" className="bg-black text-white">Rating</option>
         </select>

      <LuChevronDown
        className="pointer-events-none absolute right-3 text-muted"
        size={14}
      />
    </label>
  );
};

export default SortDropdown;