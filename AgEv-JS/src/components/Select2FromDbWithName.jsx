import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { useGetData } from "../hooks/dataApi";
import ErrorMessage from "./Error/ErrorMessage";
import { GrClose, GrSearch } from "react-icons/gr";
import { FiChevronDown } from "react-icons/fi";

export const Select2FromDbWithName = ({
  control,
  label,
  path,
  name,
  errorMessage,
  isDisabled = false,
  placeholder = "-- Select --",
}) => {
  const { data: lists } = path ? useGetData(label, path) : { data: null };
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  console.log("lists", path);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleDropdownToggle = () => {
    if (isDisabled) return;

    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (newIsOpen) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 0);
    }

    if (newIsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  const filteredOptions = React.useMemo(() => {
    if (!lists?.data) return [];
    return lists.data.filter((item) =>
      item.listName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [lists?.data, searchTerm]);

  const handleSelectOption = (option, onChange) => {
    const value = `${option.listId}-${option.listName}`;
    onChange(value);
    setSearchTerm("");
    setIsOpen(false);
    document.removeEventListener("mousedown", handleClickOutside);
  };

  const handleClearSelection = (onChange, event) => {
    event.stopPropagation();
    onChange("");
  };

  const getSelectedOptionLabel = (value) => {
    if (!value || !lists?.data) return "";
    const parts = value.split('-');
    if (parts.length < 2) return "";
    return parts.slice(1).join('-');
  };

  return (
    <div className="form-row w-full">
      <label className="block">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={handleDropdownToggle}
              className={`flex items-center justify-between px-3 py-[6px] border rounded-md w-full cursor-pointer ${
                isDisabled ? "bg-gray-100" : "bg-white"
              } ${
                isOpen
                  ? "border-blue-500 ring-2 ring-blue-100"
                  : "border-gray-300"
              }`}
            >
              <div className="truncate">
                {field.value
                  ? getSelectedOptionLabel(field.value)
                  : placeholder}
              </div>
              <div className="flex items-center">
                {field.value && (
                  <button
                    type="button"
                    onClick={(e) => handleClearSelection(field.onChange, e)}
                    className="mr-1 text-red-600 hover:text-red-800"
                    disabled={isDisabled}
                  >
                    <GrClose size={16} />
                  </button>
                )}
                <FiChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform ${
                    isOpen ? "transform rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {isOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                <div className="p-2 border-b">
                  <div className="relative">
                    <GrSearch
                      size={16}
                      className="absolute left-2 top-2.5 text-gray-400"
                    />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                      className="w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {filteredOptions.length === 0 ? (
                    <div className="p-2 text-center text-gray-500">
                      No options found
                    </div>
                  ) : (
                    filteredOptions.map((item) => {
                      const optionValue = `${item.listId}-${item.listName}`;
                      return (
                        <div
                          key={item.listId}
                          onClick={() => handleSelectOption(item, field.onChange)}
                          className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                            field.value === optionValue
                              ? "bg-blue-50 text-blue-700"
                              : ""
                          }`}
                        >
                          {item.listName}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            <select
              {...field}
              className="sr-only"
              aria-hidden="true"
              disabled={isDisabled}
            >
              <option value="">{placeholder}</option>
              {lists?.data?.map((item) => {
                const optionValue = `${item.listId}-${item.listName}`;
                return (
                  <option key={item.listId} value={optionValue}>
                    {item.listName}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};