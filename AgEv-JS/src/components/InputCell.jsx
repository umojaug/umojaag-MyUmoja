const InputCell = ({ 
  placeholder = "Enter value", 
  initialValue, 
  onBlur,
  maxDecimalPlaces = 2,
  className = "w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
}) => {
  const formatNumber = (value) => {
    if (value === "" || value === null || value === undefined) return "";
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimalPlaces,
    });
  };

  const parseNumber = (value) => {
    return value.replace(/,/g, "");
  };

  const handleInput = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.,]/g, "");
    let rawValue = parseNumber(value);
    
    const decimalCount = (rawValue.match(/\./g) || []).length;
    if (decimalCount > 1) {
      return;
    }

    if (rawValue.includes('.')) {
      const parts = rawValue.split('.');
      if (parts[1] && parts[1].length > maxDecimalPlaces) {
        parts[1] = parts[1].substring(0, maxDecimalPlaces);
        rawValue = parts.join('.');
      }
    }

    if (rawValue !== "" && !isNaN(parseFloat(rawValue))) {
      const parts = rawValue.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      e.target.value = parts.join(".");
    } else {
      e.target.value = rawValue;
    }
  };

  const handleBlur = (e) => {
    const rawValue = parseNumber(e.target.value);
    const numericValue = parseFloat(rawValue);

    if (!isNaN(numericValue) && numericValue >= 0) {
      e.target.value = formatNumber(numericValue);
      onBlur && onBlur(e);
    } else if (rawValue === "") {
      onBlur && onBlur(e);
    } else {
      e.target.value = formatNumber(initialValue);
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      defaultValue={formatNumber(initialValue)}
      className={className}
      onInput={handleInput}
      onBlur={handleBlur}
    />
  );
};

export default InputCell;