import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import qs from "qs";

export type Item = {
  name: string;
  category: string;
  value: string | number;
  id: string;
};

const fetchSuggestions = async (query: string) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!API_URL) {
    throw new Error("API_URL is not defined");
  }
  try {
    const queryString = qs.stringify({ name: query });
    const { data } = await axios.get<Item[]>(`${API_URL}?${queryString}`);
    return data;
  } catch (error) {
    throw new Error(`Error fetching suggestions: ${error}`);
  }
};

export const useAutocomplete = (query: string) => {
  return useQuery({
    queryKey: ["autocomplete", query],
    queryFn: () => fetchSuggestions(query),
    enabled: !!query,
  });
};
