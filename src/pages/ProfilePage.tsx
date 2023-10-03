import { Button, Stack, Text } from "../components";
import { useLogout } from "../data";

export default function ProfilePage() {
  const logout = useLogout();
  return (
    <Stack backgroundColor="surfaceReturned">
      <Text>Hello Profile</Text>
      <Text color="textMedium" fontSize="sm" paddingX="8">
        Please add a store. So, that you can manage inventory for your stores!
      </Text>
      <Button onClick={logout}>Logout</Button>
    </Stack>
  );
}
