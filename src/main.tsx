import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import UsedHome from "./pages/UsedHome.tsx";
import MyPage from "./pages/MyPage.tsx";
import UsedPostUpload from "./pages/UsedPostUpload.tsx";
import MyList from "./pages/MyList.tsx";
import MySalelist from "./pages/MySalelist.tsx";
import MyProfile from "./pages/MyProfile.tsx";
import UsedDetail from "./pages/UsedDetail.tsx";
import ProductsDtail from "./pages/ProductsDtail.tsx";
import NewProduct from "./pages/NewProduct.tsx";
import Products from "./pages/Products.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/:keyword", element: <Home /> },
      { path: "/products/new", element: <NewProduct /> },
      { path: "/products", element: <Products /> },
      { path: "/products/detail/:id", element: <ProductsDtail /> },
      { path: "/api/login", element: <Login /> },
      { path: "/usedHome", element: <UsedHome /> },
      { path: "/usedHome/detail/:id", element: <UsedDetail /> },
      { path: "/usedPostUpload", element: <UsedPostUpload /> },
      { path: "/my", element: <MyPage /> },
      { path: "/my/salelist", element: <MySalelist /> },
      { path: "/my/:list", element: <MyList /> },
      { path: "/my/profile", element: <MyProfile /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
