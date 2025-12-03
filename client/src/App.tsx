import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { AuthProvider } from "./store/AuthContext";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ProtectedRoute from "./pages/ProtectedRoute";
import RootLayout from "./pages/RootLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import { NotificationProvider } from "./store/NotificationContext";
import History from "./pages/history/History";

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
              element: <RootLayout />,
              children: [
                {
                  path: "/",
                  element: <Dashboard />,
                },
                {
                  path: "/history",
                  element: <History />
                }
              ],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <NotificationProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
