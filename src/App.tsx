import "./index.css";
import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "./components/common/BottomNav";

function App() {
  const location = useLocation();

  return (
    <>
      <Outlet />
      {location.pathname !== "/api/login" && <BottomNav />}
    </>
  );
}

export default App;
