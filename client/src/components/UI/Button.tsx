import React from "react";
import Spinner from "./Spinner";
import { motion } from "motion/react";

export const ButtonThemes = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  danger: "bg-danger-vibrant text-white",
  warning: "bg-warning-vibrant text-black",
  success: "bg-success-vibrant text-white",
  info: "bg-info-vibrant text-white",
  outlined: "bg-transparent text-text border-2 border-primary",
  none: ""
} as const;

export type ButtonThemesOptions = keyof typeof ButtonThemes;

interface ButtonProps {
  className?: string; // optional prop
  type?: "button" | "submit" | "reset"; // specific values allowed for the type prop
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // function type for onClick event
  disabled?: boolean; // boolean type for disabled prop
  children: React.ReactNode; // children prop to allow nested content
  name?: string;
  value?: string;
  theme?: ButtonThemesOptions;
  loadingOnlySpinner?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  type,
  onClick,
  disabled,
  children,
  name,
  value,
  theme = "primary",
  loadingOnlySpinner,
  isLoading = false,
  ...props
}) => {
  const themeClasses = ButtonThemes[theme] || "";
  let buttonContent: React.ReactNode = children;

  if (isLoading) {
    if (loadingOnlySpinner) {
      buttonContent = <Spinner size="XS" className="mr-2" />;
    } else {
      buttonContent = (
        <>
          <Spinner size="XS" className="mr-2" />
          {children}
        </>
      );
    }
  }

  return (
    <motion.button
      initial={{ scale: 1, x: 0 }}
      whileHover={disabled ? { scale: 1, x: 0 } : { scale: 1.01, x: -2, y: -2 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      name={name}
      value={value}
      className={`px-10 py-3 flex justify-center items-center font-medium rounded-md  ${themeClasses} ${className} ${
        disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
      }`}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button;
