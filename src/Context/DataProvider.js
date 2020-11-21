import React, { useState } from "react";
// import CounterContext from './CounterContext'
import DataContext from "./DataContext";

const dataProvider = ({ children }) => {
  const [data, setData] = useState({
    global_HasilInspeksi: [],
  });
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export default dataProvider;
