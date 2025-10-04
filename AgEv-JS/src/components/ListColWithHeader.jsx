import React from "react";
import { Link } from "react-router-dom";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export const ListHeader = ({ label, className = "flex justify-start" }) => {
  return (
    <div className={className}>
      <span className="font-semibold text-center">{label}</span>
    </div>
  );
};

export const SortableListHeader = ({
  label,
  sortKey,
  currentSort,
  onSort,
  className = "flex justify-start items-center"
}) => {
  const isSortable = !!sortKey;

  const handleClick = () => {
    if (isSortable && onSort) {
      onSort(sortKey);
    }
  };

  const getSortIcon = () => {
    if (!isSortable || !currentSort || currentSort.key !== sortKey) {
      return isSortable ? <FaSort className="w-3 h-3 ml-1 text-gray-400" /> : null;
    }

    if (currentSort.direction === 'asc') {
      return <FaSortUp className="w-3 h-3 ml-1 text-blue-600" />;
    } else {
      return <FaSortDown className="w-3 h-3 ml-1 text-blue-600" />;
    }
  };

  return (
    <div
      className={`${className} ${isSortable ? 'cursor-pointer px-2 py-1' : ''}`}
      onClick={handleClick}
    >
      <span className="font-semibold text-center">{label}</span>
      {getSortIcon()}
    </div>
  );
};

export const ListCol = ({ label, value, className = "" }) => {
  return (
    <div className={className}>
      <span className="inline-block md:hidden font-semibold">{label}</span>
      <span className="break-words">{value}</span>
    </div>
  );
};

export const ListColLink = ({ label, value, className = "" }) => {
  return (
    <div className={className}>
      <a href={value} className="w-full btn-sky">
        <span className="break-words">{label}</span>
      </a>
    </div>
  );
};

export const ListColRouteLink = ({ label, path, value, className = "" }) => {
  return (
    <Link className={className} to={path}>
      <span className="inline-block md:hidden font-semibold">{label}</span>
      <span className="break-words">{value}</span>
    </Link>
  );
};

export const ListColDetails = ({ label, value, className = "" }) => {
  return (
    <div className={className}>
      <span className="inline-block font-semibold">{label}</span>
      <span className="break-words">{value}</span>
    </div>
  );
};
