import { Link, Outlet } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  HomeIcon,
  Inline,
  OfficeIcon,
  ShopIcon,
  Stack,
} from "../components";
import { Text } from "../components/Text";
import { useProfile } from "../data";

export default function DashboardPage() {
  return (
    <Stack paddingY="4">
      <Stack
        gap="3"
        flex="1"
        paddingY="24"
        alignItems="center"
        justifyContent="center"
      >
        <ShopIcon />
        <Stack gap="1" textAlign="center">
          <Text>No Store Added Yet!</Text>
          <Text color="textMedium" fontSize="sm" paddingX="8">
            Please add a store. So, that you can manage inventory for your
            stores!
          </Text>
        </Stack>
        <Button>Add new store</Button>
      </Stack>
    </Stack>
  );
}

export function DashboardLayout() {
  const { user } = useProfile();
  return (
    <Stack position="relative" height="full" minHeight="screen" paddingX="4">
      <Inline
        position="fixed"
        top="0"
        paddingY="2"
        width="full"
        backgroundColor="surfaceDefault"
      >
        <Inline gap="2" alignItems="center">
          <Avatar id={user.uid} name={user?.displayName} />
          <Text>{user?.displayName || user?.email}</Text>
        </Inline>
      </Inline>
      <Box overflow="auto" paddingY="12" flex="1" height="full">
        <Outlet />
      </Box>
      <Inline
        position="fixed"
        bottom="0"
        width="full"
        borderTopWidth="1"
        paddingY="2"
        paddingX="4"
        gap="4"
        zIndex="10"
        backgroundColor="surfaceDefault"
        justifyContent="between"
        borderColor="borderSeparator"
      >
        <Stack
          textAlign="center"
          width="full"
          alignItems="center"
          as={Link}
          to="/dashboard"
          justifyContent="center"
        >
          <HomeIcon />
          <Text fontSize="sm">Home</Text>
        </Stack>
        <Stack
          width="full"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          as={Link}
          to="profile"
        >
          <OfficeIcon />
          <Text fontSize="sm">Profile</Text>
        </Stack>
      </Inline>
    </Stack>
  );
}
