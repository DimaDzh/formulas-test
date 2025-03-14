import React, { useState, useEffect } from "react";
import Tag from "@/components/Tag";
import { TableCell, TableRow } from "@/components/ui/table";
import FormulaInput from "@/components/FormulaInput";
import { Item } from "@/hooks/useAutocomplete";

interface Formula {
  name: string;
  category: string;
  value: number;
  id: string;
}

interface Variable {
  name: string;
  formulas: Formula[];
  results: number;
}

interface VariableRowProps {
  variable: Variable;
  index: number;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleTagRemove: (variableIndex: number, formulaIndex: number) => void;
  handleSuggestionClick: (variableIndex: number, suggestion: Item) => void;
  suggestions: Item[];
}

const VariableRow: React.FC<VariableRowProps> = ({
  variable,
  index,
  handleInputChange,
  handleTagRemove,
  handleSuggestionClick,

  suggestions,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const totalValue = variable.formulas.reduce(
      (acc, formula) => acc + formula.value,
      0
    );
    variable.results = totalValue;
  }, [variable.formulas]);

  const clearInput = () => {
    setInputValue("");
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "") {
      handleTagRemove(index, variable.formulas.length - 1);
    }
  };

  return (
    <TableRow key={index}>
      <TableCell>{variable.name}</TableCell>
      <TableCell>
        <div className="flex flex-wrap items-center relative">
          <div className="flex flex-wrap mb-2">
            {variable.formulas.map((formula, formulaIndex) => (
              <Tag
                key={formula.id + formulaIndex}
                value={formula.name}
                onRemove={() => handleTagRemove(index, formulaIndex)}
                className="mr-2 mb-2"
              />
            ))}
          </div>
          <FormulaInput
            id={`formula-input-${index}`}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setQuery(e.target.value);
              handleInputChange(e, index);
            }}
            onKeyDown={handleKeyDown}
            suggestions={suggestions}
            onSuggestionClick={(suggestion) => {
              handleSuggestionClick(index, suggestion);
              clearInput();
            }}
            query={query}
            clearInput={clearInput}
          />
        </div>
      </TableCell>
      <TableCell>{variable.results}</TableCell>
    </TableRow>
  );
};

export default VariableRow;
