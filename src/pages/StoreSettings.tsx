import { useParams } from "react-router-dom";
import { SuspenseWithPerf, useUser } from "reactfire";
import {
  AddTeamMemberIcon,
  Avatar,
  Box,
  Button,
  DataLoadingFallback,
  Inline,
  LocationOnIcon,
  Stack,
  StoreIcon,
  Text,
} from "../components";
import Page from "./Page";
import { TeamMember, TeamRoles, useStore } from "../data";
import { User } from "firebase/auth";

export default function StoreSettingsPage() {
  const { storeId } = useParams();
  if (!storeId) return null;
  return (
    <SuspenseWithPerf
      fallback={<DataLoadingFallback label="Loading store details..." />}
      traceId="loading_store_details"
    >
      <StoreSettings key={storeId} storeId={storeId} />
    </SuspenseWithPerf>
  );
}

function StoreSettings({ storeId }: { storeId: string }) {
  const { data: user } = useUser();
  const { store, involvedTeamWithRoles } = useStore(storeId);
  const { owner, admins } = involvedTeamWithRoles;
  return (
    <Page backTo={`/dashboard/stores/${storeId}`} title="Store Settings">
      <Stack gap="6" paddingY="4" position="relative">
        <Stack gap="3" paddingX="6">
          <Inline gap="3">
            <Box>
              <StoreIcon size="8" />
            </Box>
            <Stack>
              <Inline gap="4" alignItems="center" justifyContent="between">
                <Text fontWeight="semibold">{store.name}</Text>
                <Inline alignItems="center" gap="1">
                  <LocationOnIcon size="3" />
                  <Text fontSize="xs">{store.address.cityAndState}</Text>
                </Inline>
              </Inline>
              <Text fontSize="sm">{store.about}</Text>
            </Stack>
          </Inline>
          {store.address ? (
            <Text fontSize="sm" fontWeight="semibold">
              Address :{" "}
              <Text as="span" fontWeight="normal">
                {store.address.addressLine1},{" "}
                {` ${store.address.cityAndState} `} - {store.address.pinCode}
              </Text>
            </Text>
          ) : null}
        </Stack>
        <Stack>
          <Inline
            backgroundColor="surfaceNeutralLowest"
            paddingY="2"
            paddingX="6"
            color="textPrimary"
          >
            <Text fontSize="sm" fontWeight="semibold">
              Team Members
            </Text>
          </Inline>
          <Stack as="ul" paddingX="6">
            <MemberListItem user={user} member={owner} role="owner" />
            {admins?.length
              ? admins.map((admin) => {
                  return (
                    <MemberListItem
                      key={admin.id}
                      user={user}
                      member={admin}
                      role="admin"
                    />
                  );
                })
              : null}
          </Stack>
        </Stack>
        <Inline
          position="fixed"
          bottom="0"
          borderTopWidth="1"
          width="full"
          borderColor="borderSeparator"
          paddingY="3"
          paddingX="6"
          justifyContent="center"
        >
          <Button fullWidth path="add-team-member">
            <AddTeamMemberIcon /> Add More Team Member
          </Button>
        </Inline>
      </Stack>
    </Page>
  );
}

function MemberListItem({
  user,
  member,
  role,
}: {
  member: TeamMember;
  user: User | null;
  role: TeamRoles;
}) {
  return (
    <Inline
      as="li"
      gap="3"
      paddingY="3"
      borderBottomWidth="1"
      width="full"
      borderColor="borderSeparator"
    >
      <Box>
        <Avatar
          size="6"
          fontSize="sm"
          id={member?.id || ""}
          name={member?.name}
        />
      </Box>
      <Stack gap="1" width="full">
        <Inline gap="2" alignItems="center" justifyContent="between">
          <Box className="line-clamp-1">
            <Text fontWeight="medium" fontSize="sm">
              {member?.name} {member?.id === user?.uid ? "(You)" : ""}
            </Text>
          </Box>
          <RoleTag role={role} />
        </Inline>
        <Text fontSize="xs">{member?.email}</Text>
      </Stack>
    </Inline>
  );
}

function RoleTag({ role }: { role: TeamRoles }) {
  return (
    <Box
      paddingX="2"
      style={{ paddingTop: 2, paddingBottom: 2 }}
      backgroundColor={
        role === "owner"
          ? "borderSuccessLowest"
          : role === "manager"
          ? "borderWarningLowest"
          : "surfacePrimaryLowest"
      }
      rounded="md"
    >
      <Text
        textTransform="capitalize"
        color={
          role === "owner"
            ? "textSuccess"
            : role === "manager"
            ? "textWarning"
            : "textPrimary"
        }
        fontSize="xs"
      >
        {role}
      </Text>
    </Box>
  );
}
