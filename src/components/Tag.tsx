import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState, useEffect, FC } from "react";
import { FaTimes } from "react-icons/fa";

interface TagProps {
  value: string;
  onRemove: () => void;
  className?: string;
}

const Tag: FC<TagProps> = ({ value, onRemove, className = "" }) => {
  const [query, setQuery] = useState(value);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  return (
    <Badge
      className={cn(
        "relative inline-flex gap-1 items-center bg-blue-100 rounded-full px-2 py-1 m-1 text-blue-800",
        className
      )}
    >
      <span className="">{query}</span>
      <button
        onClick={onRemove}
        className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 rounded"
        aria-label={`Remove ${query}`}
      >
        <FaTimes className="h-4 w-4" />
      </button>
    </Badge>
  );
};

export default Tag;
