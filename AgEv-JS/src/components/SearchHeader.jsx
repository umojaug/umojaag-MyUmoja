import { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchHeader = ({ action, placeholder }) => {
  const componentRef = useRef();
  const setValue = () => {
    action(componentRef.current.value.trim());
  };
  return (
    <>
      <div className="flex space-x-2 items-center p-1 border border-gray-300 text-gray-900 focus:border-none rounded-t-md focus:outline-none my-2">
        <input
          type="search"
          className="w-full border-none outline-none px-2 py-2"
          placeholder={`Search by ` + placeholder}
          onChange={setValue}
          onKeyDown={(event) => event.key === "Enter" && setValue()}
          autoFocus={true}
          ref={componentRef}
        />
        <div className="p-1 btn-gray w-10 h-10" onClick={setValue}>
          <AiOutlineSearch size={24} />
        </div>
      </div>
    </>
  );
};

export default SearchHeader;
