import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/AuthContext";
import Button from "../../components/UI/Button";
import { Link, useNavigate } from "react-router";
import Logo from "../../components/UI/Logo";
import Input from "../../components/UI/Input";

interface SignUpCredentials {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  surname: string;
  currency: string;
}

const currencyOptions = [
  { value: "USD", text: "US Dollar (USD)" },
  { value: "EUR", text: "Euro (EUR)" },
  { value: "GBP", text: "British Pound (GBP)" },
  { value: "JPY", text: "Japanese Yen (JPY)" },
  { value: "CHF", text: "Swiss Franc (CHF)" },
  { value: "CAD", text: "Canadian Dollar (CAD)" },
  { value: "AUD", text: "Australian Dollar (AUD)" },
  { value: "NZD", text: "New Zealand Dollar (NZD)" },
  { value: "CNY", text: "Chinese Yuan (CNY)" },
  { value: "SEK", text: "Swedish Krona (SEK)" },
  { value: "NOK", text: "Norwegian Krone (NOK)" },
  { value: "DKK", text: "Danish Krone (DKK)" },
  { value: "PLN", text: "Polish Zloty (PLN)" },
  { value: "CZK", text: "Czech Koruna (CZK)" },
  { value: "HUF", text: "Hungarian Forint (HUF)" },
  { value: "MXN", text: "Mexican Peso (MXN)" },
  { value: "BRL", text: "Brazilian Real (BRL)" },
  { value: "INR", text: "Indian Rupee (INR)" },
  { value: "KRW", text: "South Korean Won (KRW)" },
  { value: "SGD", text: "Singapore Dollar (SGD)" },
  { value: "HKD", text: "Hong Kong Dollar (HKD)" },
  { value: "ZAR", text: "South African Rand (ZAR)" },
  { value: "TRY", text: "Turkish Lira (TRY)" },
  { value: "AED", text: "UAE Dirham (AED)" },
  { value: "SAR", text: "Saudi Riyal (SAR)" }
];



const SignUp: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { signup, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logOut();
  }, [logOut]);

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    setErrorMessage("");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const repeatPassword = formData.get("password-repeat") as string;
    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const currency = formData.get("currency") as string;
    if (
      !formData ||
      !email ||
      !password ||
      !repeatPassword ||
      !name ||
      !surname ||
      !currency
    ) {
      setErrorMessage("Did not provided all required informations.");
      return;
    }
    const data: SignUpCredentials = {
      email,
      password,
      repeatPassword,
      name,
      surname,
      currency
    };
    if (
      data.password?.toString().trim() !==
      data.repeatPassword?.toString().trim()
    ) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    if (signup) {
      const result = await signup(data);
      if (result.success) {
        navigate("/login");
      } else {
        setErrorMessage(
          result.message || "Adding new user failed. Please try again."
        );
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
          className="flex flex-col justify-center  gap-5"
          onSubmit={handleSubmit}
        >
          <h2 className="uppercase font-semibold text-xl border-b w-full text-center text-text border-border p-2">
            SIGNUP
          </h2>
          <Input
            type="email"
            id="emailInput"
            name="email"
            placeholder="Email"
            required
          />
          <div className="flex flex-col sm:flex-row sm:justify-between gap-5 sm:items-center">
            <Input
              type="text"
              id="nameInput"
              name="name"
              placeholder="Name"
              required
            />
            <Input
              type="text"
              id="surnameInput"
              name="surname"
              placeholder="Surname"
              required
            />
          </div>
          <Input
            type="password"
            id="passwordInput"
            name="password"
            placeholder="Password"
            minLength={8}
            required
          />
          <Input
            type="password"
            id="passwordRepeatInput"
            name="password-repeat"
            placeholder="Repeat password"
            required
          />
          <Input
            inputType="select"
            id="currencyInput"
            name="currency"
            options={currencyOptions}
            required
          />
          <p className="text-xs font-semibold text-red-700">{errorMessage}</p>
          <Button className="self-center" type="submit">
            SIGNUP
          </Button>
          <Link
            to="/login"
            className="group text-sm text-center font-semibold text-text-muted hover:text-secondary"
          >
            Already have an account?{" "}
            <span className="text-normal-orange">Log In</span>!
          </Link>
        </form>
      </div>
      <p className="fixed bottom-0 left0 w-full text-center p-2 mb-2 font-normal text-xs md:text-sm  text-text-muted ">
        Read about{" "}
        <span className="font-semibold hover:text-secondary">
          Privacy Policy
        </span>{" "}
        and{" "}
        <span className="font-semibold hover:text-secondary">Terms Of Use</span>
      </p>
    </section>
  );
};

export default SignUp;
