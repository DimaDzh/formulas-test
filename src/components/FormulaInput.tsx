import { Item } from "@/hooks/useAutocomplete";
import React from "react";

interface FormulaInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  suggestions: Item[];
  onSuggestionClick: (suggestion: Item) => void;
  query: string;
  clearInput: () => void;
}

const FormulaInput: React.FC<FormulaInputProps> = ({
  id,
  value,
  onChange,
  onKeyDown,
  suggestions,
  onSuggestionClick,
  query,
  clearInput,
}) => {
  const handleSuggestionClick = (suggestion: Item) => {
    onSuggestionClick(suggestion);
    clearInput();
  };

  return (
    <div className="relative w-full">
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Enter formula..."
        className="w-full p-2 rounded focus:outline-none focus:border-none"
      />
      {query && suggestions && suggestions.length > 0 && (
        <ul className="inset-0  bg-white border h-64 border-gray-300 rounded mt-1 w-full overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id + index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormulaInput;
