import { Button, Stack, Text } from "../components";
import { useLogout, useProfile } from "../data";

export default function ProfilePage() {
  const logout = useLogout();
  const { user } = useProfile();
  return (
    <Stack padding="6" gap="3">
      <Stack gap="1">
        <Text textTransform="capitalize">Hello, {user.displayName}</Text>
        <Text color="textMedium" fontSize="sm">
          Email: {user.email}
        </Text>
      </Stack>
      <Button onClick={logout} mode="outlined">
        Logout
      </Button>
    </Stack>
  );
}
