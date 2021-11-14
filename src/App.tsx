import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import useAuthUser from "./hooks/useAuthUser";
import useWindowSize from "./hooks/useWindowSize";
import "./App.scss";
import Chat from "./components/Chat";

function App() {
  const user = useAuthUser();
  const page = useWindowSize();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app">
      {/* TODO: Fix handling of routing in responsive situation */}
      {/* <Navigate to={page.isMobile ? "/chats" : "/"} /> */}
      <div className="app__body">
        <Sidebar page={page} user={user} />
        <Routes>
          <Route
            path="/room/:roomId"
            element={<Chat user={user} page={page} />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
