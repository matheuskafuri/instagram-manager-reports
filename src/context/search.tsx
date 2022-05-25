import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type SearchContextData = {
  search: string;
  setSearch: (search: string) => void;
};

type SearchContextProviderProps = {
  children: ReactNode;
};

const SearchContext = createContext({} as SearchContextData);

function SearchContextProvider({ children }: SearchContextProviderProps) {
  const [data, setData] = useState("");

  const setSearch = useCallback((search: string) => {
    setData(search);
  }, []);

  return (
    <SearchContext.Provider value={{ search: data, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider"
    );
  }

  return context;
};

export { SearchContextProvider, useSearchContext };
