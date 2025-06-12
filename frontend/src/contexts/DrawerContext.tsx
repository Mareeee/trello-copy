import { createContext } from "react";

export type DrawerContextType = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const DrawerContext = createContext<DrawerContextType>({
  open: false,
  setOpen: () => {},
});
