import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello World</div>,
    },
  ]);

  return <RouterProvider router={router} />
}

export default App
