import { RouterProvider, createBrowserRouter } from "react-router-dom";

export const MainRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="w-full h-dvh flex items-center justify-center">
          <span className="text-4xl">Hello world</span>
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};
