import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Formula, Variable } from "./types";
import { MOCK_DATA } from "./mockData";

interface StoreState {
  variables: Variable[];
  setVariables: (variables: Variable[]) => void;
  addVariable: (variable: Variable) => void;
  updateVariableName: (index: number, newName: string) => void;
  deleteFormula: (variableIndex: number, formulaIndex: number) => void;
  addFormula: (variableIndex: number, formula: Formula) => void;
  deleteVariable: (index: number) => void;
  clearStore: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      variables: MOCK_DATA,
      setVariables: (variables) => set({ variables }),
      addVariable: (variable) =>
        set((state) => ({ variables: [...state.variables, variable] })),
      updateVariableName: (index, newName) =>
        set((state) => {
          const variables = [...state.variables];
          variables[index].name = newName;
          return { variables };
        }),
      deleteFormula: (variableIndex, formulaIndex) =>
        set((state) => {
          const variables = [...state.variables];
          variables[variableIndex].formulas = variables[
            variableIndex
          ].formulas.filter((_, i) => i !== formulaIndex);
          variables[variableIndex].results = calculateTotalValue(
            variables[variableIndex].formulas
          );
          return { variables };
        }),
      addFormula: (variableIndex, formula) =>
        set((state) => {
          const variables = [...state.variables];
          const newFormula = {
            ...formula,
            value: calculateFormulaValue(formula), // Calculate the value here
          };
          variables[variableIndex].formulas.push(newFormula);
          variables[variableIndex].results = calculateTotalValue(
            variables[variableIndex].formulas
          );
          return { variables };
        }),
      deleteVariable: (index) =>
        set((state) => {
          const variables = state.variables.filter((_, i) => i !== index);
          return { variables };
        }),
      clearStore: () => set({ variables: [] }),
    }),
    {
      name: "store", // unique name
    }
  )
);

// Dummy function to calculate the value of a formula
const calculateFormulaValue = (formula: Formula): number => {
  // Implement your calculation logic here
  // For example, you can return a fixed value or calculate based on the formula properties
  return formula.value; // Example: return the value from the formula
};

// Function to calculate the total value of formulas
const calculateTotalValue = (formulas: Formula[]): number => {
  return formulas.reduce((acc, formula) => acc + formula.value, 0);
};
