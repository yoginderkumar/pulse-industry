import { useNavigate, useParams } from "react-router-dom";
import { SuspenseWithPerf, useUser } from "reactfire";
import {
  AddTeamMemberIcon,
  Avatar,
  Box,
  Button,
  CloseIcon,
  DataLoadingFallback,
  Inline,
  LocationOnIcon,
  Modal,
  ModalBody,
  ModalFooter,
  Stack,
  StoreIcon,
  Text,
  TrashIcon,
  useOverlayTriggerState,
} from "../components";
import Page from "./Page";
import {
  STORE_PERMISSIONS,
  TeamMember,
  TeamRoles,
  useDeleteStore,
  useRemoveMember,
  useStore,
} from "../data";
import { User } from "firebase/auth";
import toast from "react-hot-toast";
import { useState } from "react";

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
  const navigate = useNavigate();
  const { store, involvedTeamWithRoles, checkIfAuthenticatedTeamMemberCan } =
    useStore(storeId);
  const { owner, admins, managers } = involvedTeamWithRoles;
  const canDeleteStore = checkIfAuthenticatedTeamMemberCan(
    STORE_PERMISSIONS.DELETE_STORE
  );
  const canAddMembers =
    checkIfAuthenticatedTeamMemberCan(STORE_PERMISSIONS.ADD_MEMBER) ||
    checkIfAuthenticatedTeamMemberCan(STORE_PERMISSIONS.ADD_MANAGER_ONLY);
  const canRemoveMembers = checkIfAuthenticatedTeamMemberCan(
    STORE_PERMISSIONS.REMOVER_MEMBER
  );
  return (
    <Page
      backTo={`/dashboard/stores/${storeId}`}
      title="Store Settings"
      actions={
        canDeleteStore ? (
          <DeleteStoreConfirmation
            storeId={storeId}
            onSuccess={() => navigate("/dashboard/home")}
          >
            {({ deleteStore }) => (
              <Box onClick={deleteStore}>
                <TrashIcon color="iconError" />
              </Box>
            )}
          </DeleteStoreConfirmation>
        ) : null
      }
    >
      <Stack gap="6" paddingY="4" position="relative">
        <Stack gap="3" paddingX="6">
          <Inline gap="3">
            <Box>
              <StoreIcon size="8" />
            </Box>
            <Stack>
              <Inline gap="4" alignItems="center" justifyContent="between">
                <Box className="line-clamp-2 break-words">
                  <Text fontWeight="semibold">{store.name}</Text>
                </Box>
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
            <MemberListItem
              user={user}
              member={owner}
              storeId={storeId}
              role="owner"
            />
            {admins?.length
              ? admins.map((admin) => {
                  return (
                    <MemberListItem
                      key={admin.id}
                      user={user}
                      member={admin}
                      role="admin"
                      storeId={storeId}
                      canRemoveUser={canRemoveMembers}
                    />
                  );
                })
              : null}
            {managers?.length
              ? managers.map((manager) => {
                  return (
                    <MemberListItem
                      key={manager.id}
                      user={user}
                      member={manager}
                      role="manager"
                      storeId={storeId}
                      canRemoveUser={canRemoveMembers}
                    />
                  );
                })
              : null}
          </Stack>
        </Stack>
        {canAddMembers ? (
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
        ) : null}
      </Stack>
    </Page>
  );
}

function MemberListItem({
  user,
  member,
  role,
  storeId,
  canRemoveUser,
}: {
  member: TeamMember;
  user: User | null;
  role: TeamRoles;
  storeId: string;
  canRemoveUser?: boolean;
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
          <Inline gap="2" alignItems="center">
            <RoleTag role={role} />
            {canRemoveUser && member?.id !== user?.uid ? (
              <RemoveTeamMemberConfirmation
                storeId={storeId}
                member={member}
                onSuccess={() => undefined}
              >
                {({ onRemove }) => (
                  <CloseIcon size="4" color="iconError" onClick={onRemove} />
                )}
              </RemoveTeamMemberConfirmation>
            ) : null}
          </Inline>
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

function DeleteStoreConfirmation({
  storeId,
  children,
  onSuccess,
}: {
  storeId: string;
  onSuccess: () => void;
  children: (props: { deleteStore: () => void }) => React.ReactNode;
}) {
  const state = useOverlayTriggerState({});
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const deleteStore = useDeleteStore(storeId);
  async function deleteHandler() {
    setIsDeleting(true);
    try {
      await deleteStore();
      onSuccess();
      toast.success("Deleted store successfully!");
      setIsDeleting(false);
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
      setIsDeleting(false);
    }
  }
  return (
    <>
      {children({ deleteStore: state.open })}
      <Modal
        isOpen={state.isOpen}
        title="Delete Store"
        onClose={state.close}
        size="sm"
      >
        <ModalBody>
          <Stack gap="2">
            <Text fontWeight="medium">Are you sure?</Text>
            <Text fontSize="sm">
              This action will delete the store and all of the data
              (products/inventory/team) will be lost forever!
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button mode="outlined" onClick={state.close}>
            Cancel
          </Button>
          <Button status="error" loading={isDeleting} onClick={deleteHandler}>
            Yes, Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

function RemoveTeamMemberConfirmation({
  member,
  storeId,
  children,
  onSuccess,
}: {
  storeId: string;
  member: TeamMember;
  onSuccess: () => void;
  children: (props: { onRemove: () => void }) => React.ReactNode;
}) {
  const state = useOverlayTriggerState({});
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const removeMember = useRemoveMember(storeId, member.id);
  async function removeHandler() {
    setIsDeleting(true);
    try {
      await removeMember();
      onSuccess();
      toast.success("Removed member successfully!");
      setIsDeleting(false);
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
      setIsDeleting(false);
    }
  }
  return (
    <>
      {children({ onRemove: state.open })}
      <Modal
        isOpen={state.isOpen}
        title={`Remove ${member.name}`}
        onClose={state.close}
        size="sm"
      >
        <ModalBody>
          <Stack gap="2">
            <Text fontWeight="medium">Are you sure?</Text>
            <Text fontSize="sm">
              {member.name} will lose access to this store!
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button mode="outlined" onClick={state.close}>
            Cancel
          </Button>
          <Button status="error" loading={isDeleting} onClick={removeHandler}>
            Yes, Remove
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
