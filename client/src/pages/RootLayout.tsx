import { Outlet } from "react-router";
import Navigation from "../components/Navigation";
import { UserProvider } from "../store/UserContext";
import { TransactionProvider } from "../store/TransactionContext";
import { CategoryProvider } from "../store/CategoryContext";

const RootLayout: React.FC = () => {
  return (
    <UserProvider>
      <CategoryProvider>
        <TransactionProvider>
          <main className="w-full h-full min-h-screen flex flex-col gap-5 px-5 justify-start max-w-7xl mx-auto">
            <Navigation />
            <Outlet />
          </main>
        </TransactionProvider>
      </CategoryProvider>
    </UserProvider>
  );
};

export default RootLayout;
