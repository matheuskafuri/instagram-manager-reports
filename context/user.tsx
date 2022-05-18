import React, { createContext, ReactNode, useCallback, useState } from "react";
import { User } from "../types/user";

type UserContextData = {
  user: User | undefined;
  setUser: (user: User) => void;
};

type UserContextProviderProps = {
  children: ReactNode;
};

const UserContext = createContext({} as UserContextData);

function UserContextProvider({ children }: UserContextProviderProps) {
  const [data, setData] = useState<User>();

  const setUser = useCallback((user: User | undefined) => {
    setData(user);
  }, []);

  return (
    <UserContext.Provider value={{ user: data, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

const useUserContext = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};

export { UserContextProvider, useUserContext };
