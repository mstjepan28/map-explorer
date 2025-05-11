import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MapScreen } from "../screens/MapScreen";

export const MainRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MapScreen />,
    },
  ]);

  return <RouterProvider router={router} />;
};
