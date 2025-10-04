const ReadOnlyCell = ({
  value,
  placeholder = "-",
  className = "w-full px-2 py-1 bg-gray-50 border border-gray-300 rounded-md text-gray-700",
  formatNumber = false,
  maxDecimalPlaces = 2
}) => {
  const formatNumberValue = (val) => {
    if (val === null || val === undefined || val === "") return placeholder;
    if (val === 0) return "0";

    const num = parseFloat(val);
    if (isNaN(num)) return val;

    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimalPlaces,
    });
  };

  const displayValue = () => {
    if (value === null || value === undefined) return placeholder;
    if (value === 0) return "0";
    if (value === "") return placeholder;

    if (formatNumber && typeof value === 'number') {
      return formatNumberValue(value);
    }

    if (typeof value === 'string') {
      if (value.includes('%')) {
        const numPart = value.replace('%', '');
        const num = parseFloat(numPart);
        if (!isNaN(num)) {
          return `${formatNumberValue(num)}%`;
        }
      }

      const num = parseFloat(value);
      if (!isNaN(num) && formatNumber) {
        return formatNumberValue(num);
      }
    }

    return value;
  };

  return (
    <div className={className}>
      {displayValue()}
    </div>
  );
};

export default ReadOnlyCell;