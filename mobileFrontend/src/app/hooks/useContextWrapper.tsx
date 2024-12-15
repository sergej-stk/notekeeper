import { useContext } from "react";

interface IConfig {
  contextName: string;
  providerName: string;
}

export default function useContextWrapper<T>(
  ReactContext: React.Context<T>,
  config: IConfig,
) {
  const context = useContext(ReactContext);
  const { contextName, providerName } = config;

  if (!context) {
    throw new Error(`${contextName} must be used within a ${providerName}`);
  }

  return context;
}
