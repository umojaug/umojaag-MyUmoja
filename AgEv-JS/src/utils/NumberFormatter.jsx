export const formatNumberWithCommas = (value) => {
  if (!value) return "";

  const parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  return parts.join(".");
};

export const removeCommas = (value) => {
  if (!value) return "";
  return value.toString().replace(/,/g, "");
};