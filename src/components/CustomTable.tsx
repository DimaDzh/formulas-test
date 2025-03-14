"use client";
import { useStore } from "@/store/useStore";
import { useState } from "react";
import VariableRow from "@/components/VariableRow";
import VariableForm from "@/components/VariableForm";
import { Item, useAutocomplete } from "@/hooks/useAutocomplete";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CustomTable() {
  const { variables, setVariables, addVariable, deleteFormula, addFormula } =
    useStore((state) => state);
  const [newVariable, setNewVariable] = useState<string>("");
  const [isAddingVariable, setIsAddingVariable] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const { data: suggestions } = useAutocomplete(query);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleTagRemove = (variableIndex: number, formulaIndex: number) => {
    deleteFormula(variableIndex, formulaIndex);
    setVariables([...variables]);
  };

  const handleAddVariable = () => {
    if (newVariable.trim() !== "") {
      addVariable({ name: newVariable, formulas: [], results: 0 });
      setNewVariable("");
      setIsAddingVariable(false);
      setVariables([
        ...variables,
        { name: newVariable, formulas: [], results: 0 },
      ]);
    }
  };

  const handleSuggestionClick = (variableIndex: number, suggestion: Item) => {
    addFormula(variableIndex, {
      name: suggestion.name,
      category: suggestion.category,
      value: Number(suggestion.value),
      id: suggestion.id,
    });
    setQuery("");
    setVariables([...variables]);
  };

  return (
    <div className="p-12 relative">
      <Table className="mt-8 ">
        <TableHeader>
          <TableRow>
            <TableHead>Variable Name</TableHead>
            <TableHead>Formulas</TableHead>
            <TableHead>Calculated Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {variables.map((variable, index) => (
            <VariableRow
              key={index}
              variable={variable}
              index={index}
              handleInputChange={handleInputChange}
              handleTagRemove={handleTagRemove}
              handleSuggestionClick={handleSuggestionClick}
              suggestions={suggestions!}
            />
          ))}
        </TableBody>
      </Table>
      <VariableForm
        newVariable={newVariable}
        setNewVariable={setNewVariable}
        handleAddVariable={handleAddVariable}
        isAddingVariable={isAddingVariable}
        setIsAddingVariable={setIsAddingVariable}
      />
    </div>
  );
}
