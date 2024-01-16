import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { DeezerApiResponse } from "../types/DeezerApiResponse";

interface DataState {
  data: DeezerApiResponse | null;
}

interface DataAction {
  type: string;
  payload: DeezerApiResponse | null;
}

interface DataContextType {
  state: DataState;
  dispatch: React.Dispatch<DataAction>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const dataReducer = (state: DataState, action: DataAction): DataState => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, { data: null });

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData debe ser utilizado dentro de DataProvider");
  }
  return context;
};

export { DataProvider, useData };
