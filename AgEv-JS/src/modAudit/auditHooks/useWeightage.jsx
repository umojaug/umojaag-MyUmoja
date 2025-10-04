const useWeightage = () => {
  const getWeightage = (value) => {
    if (value >= 1 && value <= 4) return "Low";
    if (value >= 5 && value <= 7) return "Medium";
    if (value >= 8 && value <= 12) return "High";
    if (value > 12) return "Critical";
  };

  return {
    getWeightage,
  };
};

export default useWeightage;
