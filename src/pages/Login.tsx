import {
  ArrowLeftIcon,
  Box,
  Button,
  Inline,
  InputField,
  Stack,
} from "../components";
import { Link, useNavigate } from "react-router-dom";
import { Text } from "../components/Text";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useLogin } from "../data";
import toast from "react-hot-toast";
import { useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const loginSchema = z.object({
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
});

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const { control, handleSubmit } = loginForm;

  const login = useLogin();

  async function onLogin(data: LoginForm) {
    setLoading(true);
    try {
      await login({
        email: data.email,
        password: data.password,
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
          <Text as="h3" fontSize="lg">
            Welcome Back 👋 <br /> to{" "}
            <Text as="span" color="textPrimary" fontWeight="semibold">
              Pulse Inventory
            </Text>
          </Text>
          <p className="text-sm">Login to your account</p>
        </Stack>
        <Stack gap="2">
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
          <Text
            as={Link}
            to="/forgot-password"
            color="textPrimary"
            textAlign="right"
            fontWeight="semibold"
            fontSize="sm"
          >
            Forgot Password?
          </Text>
          <Button
            className="mt-4"
            loading={loading}
            onClick={handleSubmit(onLogin)}
          >
            Login
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
          <p className="text-center text-sm">
            New here?{" "}
            <Link to="/sign-up" className="font-semibold text-sky-900">
              Create an account
            </Link>
          </p>
        </Stack>
      </Stack>
    </Box>
  );
}
