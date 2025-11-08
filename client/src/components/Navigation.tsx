import { NavLink } from "react-router";
import Logo from "./UI/Logo";
import { useAuth } from "../store/AuthContext";
import { LogOutIcon } from "lucide-react";

const Navigation: React.FC = () => {
  const { logOut } = useAuth();

  return (
    <div className="py-5 flex justify-between items-center gap-5">
      <Logo textSize="xl" size={42} />
      <div className="flex justify-end items-center gap-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary" : "hover:text-secondary"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            isActive ? "text-primary" : "hover:text-secondary"
          }
        >
          Expenses
        </NavLink>
        <NavLink
          to="/budget"
          className={({ isActive }) =>
            isActive ? "text-primary" : "hover:text-secondary"
          }
        >
          Budget
        </NavLink>
        <NavLink
          to="/user"
          className={({ isActive }) =>
            isActive ? "text-primary" : "hover:text-secondary"
          }
        >
          User
        </NavLink>
        <LogOutIcon
          size={20}
          className="cursor-pointer hover:text-text-muted"
          onClick={() => logOut()}
        />
      </div>
    </div>
  );
};

export default Navigation;
