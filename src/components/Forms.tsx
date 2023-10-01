import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { Box } from "./Box";
import { Text } from "./Text";
import { SpinnerIcon } from "./Icons";

export function InputField({
  id,
  name,
  value,
  type,
  label,
  error,
  noMargin,
  placeholder,
  onChange,
}: {
  id?: string;
  placeholder?: string;
  name: string;
  label?: string;
  error?: string | Error;
  noMargin?: boolean;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const errorMessage = typeof error === "string" ? error : error?.message;
  return (
    <Box position="relative" marginBottom={noMargin ? "0" : "4"}>
      <Box
        as="input"
        type={type}
        id={id || name}
        display="block"
        fontSize="sm"
        color="textMedium"
        backgroundColor="transparent"
        rounded="lg"
        borderWidth="1"
        borderColor={{
          default: errorMessage?.length ? "borderError" : "borderSeparator",
          focus: errorMessage?.length ? "borderError" : "borderPrimary",
        }}
        paddingX={label || placeholder ? "3" : "2"}
        paddingBottom="3"
        paddingTop={label ? "4" : "3"}
        width="full"
        value={value}
        placeholder={placeholder || label}
        className={classNames("appearance-none outline-none focus:ring-0 peer")}
        onChange={onChange}
      />
      {label || placeholder ? (
        <Box
          as="label"
          htmlFor={id || name}
          position="absolute"
          fontSize="sm"
          color={{
            default: errorMessage?.length ? "textError" : "textMedium",
            focus: "textPrimary",
          }}
          className={classNames(
            "duration-300 transform -translate-y-4 scale-75 peer-focus:text-blue-600 top-2 z-10 origin-[0] peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3",
            { "peer-focus:text-red-600": errorMessage?.length }
          )}
          paddingX="1"
          backgroundColor="surfaceDefault"
        >
          {label || placeholder}
        </Box>
      ) : null}
      {errorMessage?.length ? (
        <Text
          fontSize="sm"
          color="textError"
          paddingTop="1"
          paddingX="1"
          position="absolute"
        >
          {errorMessage}
        </Text>
      ) : null}
    </Box>
  );
}

export function Button({
  path,
  type,
  className,
  children,
  loading,
  disabled,
  onClick,
}: {
  path?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  onClick?: () => void;
}) {
  disabled = disabled || loading;
  return path?.length ? (
    <Box
      as={Link}
      to={path}
      backgroundColor="surfacePrimary"
      paddingY="3"
      rounded="lg"
      color="textWhite"
      className={classNames(className)}
      onClick={onClick}
    >
      {children}
    </Box>
  ) : (
    <Box
      as="button"
      type={type}
      paddingY="2"
      rounded="lg"
      color={disabled ? "textLow" : "textWhite"}
      onClick={onClick}
      disabled={disabled}
      className={classNames(className)}
      paddingX="3"
      backgroundColor={disabled ? "surfaceNeutralLowest" : "surfacePrimary"}
    >
      {loading ? <SpinnerIcon marginRight="2" /> : null}
      {children}
    </Box>
  );
}
