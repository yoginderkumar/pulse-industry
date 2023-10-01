import { Button, Stack } from "../components";
import { useLogout } from "../data";

export default function ProfilePage() {
  const logout = useLogout();
  return (
    <Stack>
      <Button onClick={logout}>Logout</Button>
    </Stack>
  );
}
