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

export type { Variable, Formula };
