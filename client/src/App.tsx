import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { AuthProvider } from "./store/AuthContext";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ProtectedRoute from "./pages/ProtectedRoute";
import RootLayout from "./pages/RootLayout";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            {
              path: "/",
              element: <RootLayout></RootLayout>,
              children: [
                {
                  path: "/",
                  element: <Dashboard />,
                }
              ]
            },
          ],
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
