import React from "react";
import useAuthUser from "./hooks/useAuthUser";

import "./App.css";
import Login from "./components/Login";

function App() {
  const user = useAuthUser();

  if (!user) {
    return <Login />;
  }
  return <div className="App">Logged</div>;
}

export default App;
