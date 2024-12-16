import { createContext, useMemo, useState } from "react";
import {
  RuleableProps,
  RuledLayoutComponentProps,
  ValueableProps,
} from "../../types";
import useContextWrapper from "@/src/app/hooks/useContextWrapper";

type InputElement = RuleableProps & ValueableProps;

interface IFormContext {
  elements: InputElement[];
  setElements: React.Dispatch<React.SetStateAction<IFormContext["elements"]>>;
}

export const FormContext = createContext<IFormContext | null>(null);

export const useFormContext = () =>
  useContextWrapper(FormContext, {
    contextName: useFormContext.name,
    providerName: FormContextProvider.name,
  });

export const FormContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [elements, setElements] = useState<IFormContext["elements"]>([]);

  const value = useMemo(() => ({ elements, setElements }), [elements]);
  return <FormContext.Provider value={value}>children</FormContext.Provider>;
};
