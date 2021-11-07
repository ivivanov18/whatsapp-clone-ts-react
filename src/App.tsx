import React from "react";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import useAuthUser from "./hooks/useAuthUser";
import useWindowSize from "./hooks/useWindowSize";
import "./App.scss";

function App() {
  const user = useAuthUser();
  const page = useWindowSize();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar page={page} user={user} />
      </div>
    </div>
  );
}

export default App;
