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
  onKeyDown,
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
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}) {
  const errorMessage = typeof error === "string" ? error : error?.message;
  return (
    <Box position="relative" width="full" marginBottom={noMargin ? "0" : "4"}>
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
        onKeyDown={onKeyDown}
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
  className,
  children,
  loading,
  disabled,
  mode,
  fullWidth,
  onClick,
}: {
  path?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  mode?: "outlined";
  fullWidth?: boolean;
}) {
  disabled = disabled || loading;
  return path?.length ? (
    <Box
      as={Link}
      to={path}
      backgroundColor="surfacePrimary"
      paddingY="3"
      rounded={"lg"}
      paddingX="3"
      height="10"
      color={
        mode === "outlined" ? "textPrimary" : disabled ? "textLow" : "textWhite"
      }
      width={fullWidth ? "full" : "fit-content"}
      className={classNames(className)}
      onClick={onClick}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  ) : (
    <Box
      as="button"
      paddingY="2"
      rounded={"lg"}
      height={"10"}
      width={fullWidth ? "full" : "fit-content"}
      color={
        mode === "outlined" ? "textPrimary" : disabled ? "textLow" : "textWhite"
      }
      onClick={onClick}
      disabled={disabled}
      className={classNames(className)}
      paddingX="3"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="2"
      borderWidth="1"
      borderColor={mode === "outlined" ? "borderPrimary" : undefined}
      backgroundColor={
        mode === "outlined"
          ? "transparent"
          : disabled
          ? "surfaceNeutralLowest"
          : "surfacePrimary"
      }
    >
      {loading ? <SpinnerIcon size="5" /> : null}
      {children}
    </Box>
  );
}

export function InputAreaField({
  id,
  name,
  value,
  label,
  error,
  rows,
  noMargin,
  placeholder,
  onChange,
}: {
  id?: string;
  placeholder?: string;
  name: string;
  rows?: number;
  label?: string;
  error?: string | Error;
  noMargin?: boolean;
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}) {
  const errorMessage = typeof error === "string" ? error : error?.message;
  return (
    <Box position="relative" marginBottom={noMargin ? "0" : "4"}>
      <Box
        as="textarea"
        id={id || name}
        display="block"
        fontSize="sm"
        color="textMedium"
        rows={rows || 3}
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
            "duration-300 transform -translate-y-4 scale-75 peer-focus:text-blue-600 top-2 z-10 origin-[0] peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3",
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
