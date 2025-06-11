import { createContext } from "react";
import { Priority } from "../enums/Pirority";

export type SearchContextType = {
  search: string;
  setSearch: (value: string) => void;
  priority: Priority;
  setPriority: (value: Priority) => void;
};

export const SearchContext = createContext<SearchContextType>({
  search: "",
  setSearch: () => {},
  priority: Priority.NONE,
  setPriority: () => {}
});
