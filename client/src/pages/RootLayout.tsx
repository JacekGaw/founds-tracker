import { Outlet } from "react-router";
import Navigation from "../components/Navigation";
import { UserProvider } from "../store/UserContext";
import { TransactionProvider } from "../store/TransactionContext";
import { CategoryProvider } from "../store/CategoryContext";
import ToastContainer from "../components/ToastContainer";

const RootLayout: React.FC = () => {
  return (
    <UserProvider>
      <ToastContainer />
      
      <CategoryProvider>
        <TransactionProvider>
          <main className="w-full h-full min-h-screen flex flex-col gap-5 px-5 pb-10 justify-start max-w-7xl mx-auto">
            <Navigation />
            <Outlet />
          </main>
        </TransactionProvider>
      </CategoryProvider>
    </UserProvider>
  );
};

export default RootLayout;
