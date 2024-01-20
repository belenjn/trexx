import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
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
  const storedData = localStorage.getItem("data");
  const initialDataState: DataState = {
    data: storedData ? JSON.parse(storedData) : null,
  };
  const [state, dispatch] = useReducer(dataReducer, initialDataState);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state.data));
  }, [state.data]);

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
