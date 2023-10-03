import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  Button,
  Inline,
  InputField,
  Stack,
} from "../components";
import { Box } from "../components/Box";
import { Text } from "../components/Text";
import { useRegister } from "../data";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";

type RegisterForm = {
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
};

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const registerSchema = z
  .object({
    fullName: z
      .string({ required_error: "Please enter a name here" })
      .nonempty(),
    email: z
      .string({
        required_error: "Please enter a valid email",
      })
      .nonempty()
      .email("Please enter a valid email"),
    password: z
      .string({
        required_error: "Enter valid password to create an account",
      })
      .nonempty()
      .min(8, "Incorrect password. Password should be minimum 8 characters.")
      .regex(
        passwordRegex,
        "Incorrect password. Password should be minimum 8 characters."
      ),
    confirmPassword: z
      .string({
        required_error: "Enter valid confirm password to create an account",
      })
      .nonempty()
      .min(8, "Incorrect password. Password should be minimum 8 characters.")
      .regex(
        passwordRegex,
        "Incorrect password. Password should be minimum 8 characters.`"
      ),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "The passwords did not match",
      });
    }
  });

export default function SignUpPage() {
  const navigate = useNavigate();
  const register = useRegister();
  const [loading, setLoading] = useState<boolean>(false);
  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  const { control, handleSubmit } = registerForm;

  async function onCreateAccount(data: RegisterForm) {
    setLoading(true);
    try {
      await register({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
      });
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <Box paddingX="4" paddingY="6">
      <Stack gap="4">
        <ArrowLeftIcon onClick={() => navigate(-1)} />
        <Stack gap="1">
          <Text fontSize="lg" fontWeight="medium">
            Create an account
          </Text>
          <Text fontSize="sm">Sign up and start exploring now</Text>
        </Stack>
        <Stack gap="2">
          <Controller
            control={control}
            name="fullName"
            render={(props) => {
              const {
                field: { onChange },
                fieldState: { error },
              } = props;
              return (
                <InputField
                  name="fullName"
                  placeholder="Full Name"
                  label="Full Name"
                  onChange={onChange}
                  error={error?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="email"
            render={(props) => {
              const {
                field: { onChange },
                fieldState: { error },
              } = props;
              return (
                <InputField
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={onChange}
                  error={error?.message}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="password"
            render={(props) => {
              const {
                field: { onChange },
                fieldState: { error },
              } = props;
              return (
                <InputField
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={onChange}
                  error={error?.message}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={(props) => {
              const {
                field: { onChange },
                fieldState: { error },
              } = props;
              return (
                <InputField
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={onChange}
                  error={error?.message}
                />
              );
            }}
          />
        </Stack>
        <Text fontSize="sm" textAlign="center" paddingX="8">
          By clicking on "Create Account" you agree to Pulse's{" "}
          <Text as={Link} to="/" color="textPrimary">
            Terms & Conditions
          </Text>{" "}
          and{" "}
          <Text as={Link} to="/" color="textPrimary">
            Privacy Policy
          </Text>
        </Text>
        <Button onClick={handleSubmit(onCreateAccount)} loading={loading}>
          Create Account
        </Button>
        <Inline alignItems="center" gap="2">
          <Box
            as="hr"
            width="full"
            height="px"
            backgroundColor="borderSeparator"
          />
          <Text fontSize="sm" fontWeight="medium">
            Or
          </Text>
          <Box
            as="hr"
            width="full"
            height="px"
            backgroundColor="borderSeparator"
          />
        </Inline>
        <Text fontSize="sm" textAlign="center">
          Already have an account?{" "}
          <Text as={Link} to="/login" color="textPrimary">
            Login
          </Text>{" "}
        </Text>
      </Stack>
    </Box>
  );
}
