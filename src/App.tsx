import React from "react";
import { Home } from "./views/Home/Home";
import "./App.css";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <Home />
    </DataProvider>
  );
}

export default App;
