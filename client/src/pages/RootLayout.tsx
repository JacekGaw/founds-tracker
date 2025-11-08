import { Outlet } from "react-router";
import Navigation from "../components/Navigation";
import { UserProvider } from "../store/UserContext";
import { TransactionProvider } from "../store/TransactionContext";

const RootLayout: React.FC = () => {
  return (
    <UserProvider>
      <TransactionProvider>
      <main className="w-full h-full min-h-screen flex flex-col gap-5 px-5 justify-start max-w-7xl mx-auto">
        <Navigation />
        <Outlet />
      </main>
      </TransactionProvider>
    </UserProvider>
  );
};

export default RootLayout;
