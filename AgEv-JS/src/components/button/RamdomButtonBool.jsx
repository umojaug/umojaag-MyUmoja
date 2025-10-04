// RamdomButton.jsx
const RamdomButtonBool = ({ principleRisks, action }) => {
  return (
    <div className="flex gap-2 my-2">
      <button onClick={() => action("")} className="btn-sky btn-sm btn-outline">
        All
      </button>
      {principleRisks.includes(true) && (
        <button
          onClick={() => action("active")}
          className="btn-sky btn-sm btn-outline"
        >
          Active
        </button>
      )}
      {principleRisks.includes(false) && (
        <button
          onClick={() => action("resigned")}
          className="btn-sky btn-sm btn-outline"
        >
          Resigned
        </button>
      )}
    </div>
  );
};

export default RamdomButtonBool;
