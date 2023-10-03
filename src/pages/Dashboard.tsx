import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  HomeIcon,
  Inline,
  OfficeIcon,
  StoreIcon,
  Stack,
  PlusIcon,
  LocationOnIcon,
} from "../components";
import { Text } from "../components/Text";
import { useProfile, useStores } from "../data";
import { useMemo } from "react";

export default function DashboardPage() {
  const { stores } = useStores();
  const navigate = useNavigate();
  const { user } = useProfile();
  return (
    <Stack paddingY="2" paddingX="6">
      {stores?.length ? (
        <Stack as="ul" gap="3">
          {stores.map((store) => (
            <Inline
              key={store.uid}
              borderWidth="1"
              borderColor="borderSeparator"
              rounded="md"
              gap="4"
              paddingX="3"
              paddingY="4"
              as="li"
              onClick={() => navigate(`/dashboard/stores/${store.uid}`)}
            >
              <Box>
                <StoreIcon size="8" />
              </Box>
              <Stack gap="3">
                <Stack gap="1">
                  <Inline alignItems="center" justifyContent="between" gap="2">
                    <Box className="line-clamp-1 break-all">
                      <Text fontSize="md">{store.name}</Text>
                    </Box>
                    <Inline alignItems="center" gap="1">
                      <LocationOnIcon size="3" />
                      <Text fontSize="xs">{store.address.cityAndState}</Text>
                    </Inline>
                  </Inline>
                  <Box className="line-clamp-3">
                    <Text fontSize="sm">{store.about}</Text>
                  </Box>
                </Stack>
                <Text fontSize="sm">
                  Role:{" "}
                  <Text
                    as="span"
                    backgroundColor="surfaceSuccess"
                    style={{ padding: "2px 4px" }}
                    rounded="md"
                    fontSize="xs"
                    color="textOnSurface"
                  >
                    {user.uid === store.ownerId ? "Owner" : "Other"}
                  </Text>{" "}
                </Text>
              </Stack>
            </Inline>
          ))}
        </Stack>
      ) : (
        <Stack
          gap="3"
          flex="1"
          paddingY="24"
          alignItems="center"
          justifyContent="center"
        >
          <StoreIcon />
          <Stack gap="1" textAlign="center">
            <Text>No Store Added Yet!</Text>
            <Text color="textMedium" fontSize="sm" paddingX="8">
              Please add a store. So, that you can manage inventory for your
              stores!
            </Text>
          </Stack>
          <Button path="/dashboard/add-new-store">Add new store</Button>
        </Stack>
      )}
      <Inline
        size="12"
        as={Link}
        to="/dashboard/add-new-store"
        position="fixed"
        style={{
          bottom: 84,
          right: 24,
        }}
        alignItems="center"
        justifyContent="center"
        backgroundColor="surfacePrimary"
        color="textOnSurface"
        rounded="full"
      >
        <PlusIcon />
      </Inline>
    </Stack>
  );
}

export function DashboardLayout() {
  const { user } = useProfile();
  const { pathname } = useLocation();

  const removeDefaultLayout: boolean = useMemo(() => {
    if (pathname.includes("/home") || pathname.includes("/profile")) {
      return false;
    }
    return true;
  }, [pathname]);

  return (
    <Stack alignItems="center" justifyContent="center">
      <Stack
        position="relative"
        maxWidth="md"
        width="full"
        height="full"
        minHeight="screen"
      >
        {removeDefaultLayout ? null : (
          <Inline
            position="fixed"
            top="0"
            paddingY="3"
            width="full"
            maxWidth="md"
            paddingX="4"
            borderBottomWidth="1"
            alignItems="center"
            gap="2"
            borderColor="borderSeparator"
            backgroundColor="surfaceDefault"
            style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.06)" }}
          >
            <Inline gap="2" alignItems="center">
              <Avatar id={user.uid} name={user?.displayName} />
              <Text>{user?.displayName || user?.email}</Text>
            </Inline>
          </Inline>
        )}
        <Box
          flex="1"
          paddingY={removeDefaultLayout ? "0" : "16"}
          height="full"
          overflow="auto"
        >
          <Outlet />
        </Box>
        {removeDefaultLayout ? null : (
          <Inline
            position="fixed"
            bottom="0"
            width="full"
            borderTopWidth="1"
            paddingY="2"
            paddingX="4"
            gap="4"
            zIndex="10"
            maxWidth="md"
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
        )}
      </Stack>
    </Stack>
  );
}
