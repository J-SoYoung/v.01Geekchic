import "./index.css";
import { Outlet, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BottomNav from "./components/common/BottomNav";

function App() {
  const location = useLocation();
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      {location.pathname !== "/api/login" && <BottomNav />}
    </>
  );
}

export default App;
