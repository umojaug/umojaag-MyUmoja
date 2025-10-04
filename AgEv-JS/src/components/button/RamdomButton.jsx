import { useMemo } from "react";

const colorPool = [
  "#1E3A8A", // dark blue
  "#3B82F6", // blue
  "#C2410C", // dark orange
  "#F97316", // orange
  "#047857", // dark green
  "#10B981", // green
  "#7C3AED", // violet
  "#EC4899", // pink
  "#FACC15", // yellow
  "#6B7280", // gray
];

const RamdomButton = ({ principleRisks, action }) => {
  // Create a color map once
  const buttonColors = useMemo(() => {
    return principleRisks
      .slice(0, 10)
      .map((_, index) => colorPool[index % colorPool.length]);
  }, [principleRisks]);

  return (
    <div className="flex gap-2 flex-wrap">
      {principleRisks.slice(0, 10).map((risk, index) => (
        <button
          key={index}
          onClick={() => action(risk)}
          style={{ backgroundColor: buttonColors[index], color: "#fff" }}
          className="px-4 py-2 rounded"
        >
          {risk}
        </button>
      ))}
    </div>
  );
};

export default RamdomButton;
