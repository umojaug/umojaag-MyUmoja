import { useState } from 'react';

export const useSorting = (initialSort = { key: "", direction: "asc" }) => {
  const [currentSort, setCurrentSort] = useState(initialSort);

  const handleSort = (key) => {
    setCurrentSort(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const resetSort = () => {
    setCurrentSort({ key: "", direction: "asc" });
  };

  return { currentSort, handleSort, resetSort };
};

export const sortData = (data, currentSort) => {
  if (!currentSort.key || !data.length) {
    return data;
  }

  return [...data].sort((a, b) => {
    const aVal = (a[currentSort.key] || "").toString().toLowerCase();
    const bVal = (b[currentSort.key] || "").toString().toLowerCase();

    if (currentSort.direction === 'asc') {
      return aVal.localeCompare(bVal);
    } else {
      return bVal.localeCompare(aVal);
    }
  });
};

export const filterAndSort = (data, query, searchFields, currentSort, enableSearch = true) => {
  let filtered = data;
  if (enableSearch && query && searchFields && searchFields.length > 0) {
    filtered = data.filter((item) => {
      return searchFields.some(field =>
        item[field]?.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  return sortData(filtered, currentSort);
};