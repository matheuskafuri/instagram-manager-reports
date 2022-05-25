import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Insights } from "../types/insights";

type InsightsContextData = {
  insights: Insights[] | undefined;
  setInsights: (insights: Insights[]) => void;
};

type InsightsContextProviderProps = {
  children: ReactNode;
};

const InsightsContext = createContext({} as InsightsContextData);

function InsightsContextProvider({ children }: InsightsContextProviderProps) {
  const [data, setData] = useState<Insights[]>();

  const setInsights = useCallback((insights: Insights[] | undefined) => {
    setData(insights);
  }, []);

  return (
    <InsightsContext.Provider value={{ insights: data, setInsights }}>
      {children}
    </InsightsContext.Provider>
  );
}

const useInsightsContext = () => {
  const context = useContext(InsightsContext);

  if (!context) {
    throw new Error(
      "useInsightsContext must be used within a InsightsContextProvider"
    );
  }

  return context;
};

export { InsightsContextProvider, useInsightsContext };
