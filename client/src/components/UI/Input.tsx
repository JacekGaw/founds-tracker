import React, { useId } from "react";

type BaseProps = {
  label?: React.ReactNode | string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  id?: string;
};

type InputProps =
  | ({
      inputType?: "input";
    } & React.InputHTMLAttributes<HTMLInputElement> &
      BaseProps)
  | ({
      inputType: "textarea";
    } & React.TextareaHTMLAttributes<HTMLTextAreaElement> &
      BaseProps)
  | ({
      inputType: "select";
      options?: Array<OptionType>;
    } & React.SelectHTMLAttributes<HTMLSelectElement> &
      BaseProps);

interface OptionType {
  value: string;
  text: string;
  className?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const {
    inputType = "input",
    label,
    className,
    labelClassName,
    inputClassName,
    id,
    ...rest
  } = props as any;

  const autoId = useId();
  const finalId = id || autoId;

  let inputElement: React.ReactNode;

  if (inputType === "textarea") {
    inputElement = (
      <textarea
        id={finalId}
        className={`p-3 rounded bg-bg-light text-text border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all ${inputClassName}`}
        {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  } else if (inputType === "select") {
    const { options, ...selectProps } = rest as {
      options?: OptionType[];
    } & React.SelectHTMLAttributes<HTMLSelectElement>;

    inputElement = (
      <select
        id={finalId}
        className={`p-3 rounded bg-bg-light text-text border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all ${inputClassName}`}
        {...selectProps}
      >
        {options?.map((option) => (
          <option
            disabled={option.disabled}
            key={option.value}
            className={option.className}
            value={option.value}
          >
            {option.text}
          </option>
        ))}
      </select>
    );
  } else {
    inputElement = (
      <input
        id={finalId}
        className={`p-3 rounded bg-bg-light text-text border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all ${inputClassName}`}
        {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={finalId} className={`text-text-muted ${labelClassName}`}>
          {label}
        </label>
      )}
      {inputElement}
    </div>
  );
};

export default Input;
