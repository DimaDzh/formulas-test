import React, { FC } from "react";

interface VariableFormProps {
  newVariable: string;
  setNewVariable: (value: string) => void;
  handleAddVariable: () => void;
  isAddingVariable: boolean;
  setIsAddingVariable: (value: boolean) => void;
}

const VariableForm: FC<VariableFormProps> = ({
  newVariable,
  setNewVariable,
  handleAddVariable,
  isAddingVariable,
  setIsAddingVariable,
}) => {
  return (
    <div className="mt-4">
      {isAddingVariable ? (
        <div className="mt-4">
          <input
            type="text"
            value={newVariable}
            onChange={(e) => setNewVariable(e.target.value)}
            placeholder="Enter variable name..."
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleAddVariable}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingVariable(true)}
          className="mt-4 p-2 bg-green-500 text-white rounded"
        >
          + New variable
        </button>
      )}
    </div>
  );
};

export default VariableForm;
