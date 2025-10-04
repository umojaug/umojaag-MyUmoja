import React from "react";
import { TbFilterSearch } from "react-icons/tb";

export default function SearchButton() {
  return (
    <button type="submit" className="btn-umojanavyblue h-[37px] gap-2">
      <TbFilterSearch size={18} /> Search
    </button>
  );
}
