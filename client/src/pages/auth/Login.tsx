import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/AuthContext";
import Button from "../../components/UI/Button";
import { Link, useNavigate } from "react-router";
import Logo from "../../components/UI/Logo";
import Input from "../../components/UI/Input";

const Login: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { login, user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      logOut();
    }
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }
    const data = { email, password };

    if (login) {
      const result = await login(data);
      if (result.success) {
        navigate("/");
      } else {
        setErrorMessage(result.message || "Login failed. Please try again.");
      }
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-bg flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-10">
        <header>
          <Logo textSize="xl" size={42} />
        </header>
        <form
          className="flex flex-col justify-center gap-5"
          onSubmit={handleSubmit}
        >
          <h2 className="uppercase font-semibold text-xl border-b w-full text-center text-text border-border p-2">
            LOGIN
          </h2>
          <Input
            type="email"
            id="emailInput"
            name="email"
            placeholder="Email"
            required
          />
          <Input
            type="password"
            id="passwordInput"
            name="password"
            placeholder="Password"
            minLength={8}
            required
          />

          <p className="text-xs font-semibold text-red-700">{errorMessage}</p>
          <Button className="self-center" type="submit">
            LOGIN
          </Button>
          <Link
            to="/signup"
            className="group text-sm text-center font-semibold text-text-muted hover:text-secondary"
          >
            Don't have account yet?{" "}
            <span className="text-normal-orange">Sign Up!</span>
          </Link>
        </form>
      </div>
      <p className="fixed bottom-0 left0 w-full text-center p-2 mb-2 font-normal text-xs md:text-sm  text-text-muted ">
        Read about{" "}
        <span className="font-semibold text-slate-500 hover:text-secondary">
          Privacy Policy
        </span>{" "}
        and{" "}
        <span className="font-semibold text-slate-500 hover:text-secondary">
          Terms Of Use
        </span>
      </p>
    </section>
  );
};

export default Login;
