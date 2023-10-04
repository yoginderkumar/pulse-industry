import { useParams } from "react-router-dom";
import { SuspenseWithPerf } from "reactfire";
import {
  Button,
  CheckCircleIcon,
  CloseCircleIcon,
  DataLoadingFallback,
  Inline,
  InputField,
  Stack,
  Text,
} from "../components";
import Page from "./Page";
import {
  ROLES_AND_PERMISSIONS,
  STORE_PERMISSIONS,
  useAddTeamMember,
  useCheckUserExistence,
  useStore,
  useUserData,
} from "../data";
import { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export default function AddNewMemberPage() {
  const { storeId } = useParams();
  if (!storeId) return null;
  return (
    <SuspenseWithPerf
      fallback={<DataLoadingFallback label="Loading store details..." />}
      traceId="loading_store_details"
    >
      <AddTeamMember key={storeId} storeId={storeId} />
    </SuspenseWithPerf>
  );
}

const addTeamSchema = z.object({
  email: z
    .string({
      required_error: "Please enter a valid email",
    })
    .nonempty()
    .email("Please enter a valid email"),
});

type AddUserForm = {
  email: string;
};

function AddTeamMember({ storeId }: { storeId: string }) {
  const { checkIfAuthenticatedTeamMemberCan } = useStore(storeId);
  const [selectedRole, setSelectedRole] = useState<"manager" | "admin">(
    "manager"
  );

  const { involvedTeam } = useStore(storeId);
  const [isAddingMember, setIsAddingMember] = useState<boolean>(false);

  const getUser = useUserData();
  const addMember = useAddTeamMember(storeId);
  const checkUserExists = useCheckUserExistence();

  const addTeamMemberForm = useForm<AddUserForm>({
    resolver: zodResolver(addTeamSchema),
  });

  const { control, handleSubmit, getValues, setError, setValue } =
    addTeamMemberForm;

  const canAddManagersOnly = checkIfAuthenticatedTeamMemberCan(
    STORE_PERMISSIONS.ADD_MANAGER_ONLY
  );

  async function addTeamMember() {
    setIsAddingMember(true);
    try {
      const email = getValues("email");
      const exists = involvedTeam.find((member) => member.email === email);
      if (exists?.id) {
        setIsAddingMember(false);
        return setError("email", {
          message: "This user already exist in your store!",
        });
      }
      const { doesExist, userId } = await checkUserExists(email);
      if (!doesExist) {
        setIsAddingMember(false);
        return setError("email", {
          message: "This user does not exist on Pulse Industry App!",
        });
      }
      const { user } = await getUser(userId);
      if (!user) {
        setIsAddingMember(false);
        throw new Error("Something went wrong. Please try again later!");
      }
      await addMember(
        {
          id: userId,
          name: user.displayName || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
        },
        selectedRole
      );
      toast.success(`Added ${user.displayName} to your store!`);
      setValue("email", "");
      setIsAddingMember(false);
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
      setIsAddingMember(false);
    }
  }

  return (
    <Page
      backTo={`/dashboard/stores/${storeId}/settings`}
      title="Add New Member"
    >
      <Stack padding="6" gap="4">
        <Controller
          control={control}
          name="email"
          render={(props) => {
            const {
              field: { onChange, value },
              fieldState: { error },
            } = props;
            return (
              <InputField
                id="email"
                name="email"
                placeholder="Email"
                value={value}
                onChange={onChange}
                error={error?.message}
              />
            );
          }}
        />
        <Inline gap="4">
          <InputField
            name="manager"
            type="radio"
            label="Manager"
            value="manager"
            checked={selectedRole === "manager"}
            onChange={() => setSelectedRole("manager")}
          />
          {canAddManagersOnly ? null : (
            <InputField
              name="admin"
              type="radio"
              label="Admin"
              readonly={canAddManagersOnly}
              checked={selectedRole === "admin"}
              value="admin"
              onChange={() => setSelectedRole("admin")}
            />
          )}
        </Inline>
        <Button
          fullWidth
          className="mt-8"
          loading={isAddingMember}
          onClick={handleSubmit(addTeamMember)}
        >
          Add Member
        </Button>
        <Stack gap="4">
          <Text color="textPrimary">
            What {ROLES_AND_PERMISSIONS[selectedRole].title} Can/Cannot do?
          </Text>
          <Stack as="ul" gap="2">
            {ROLES_AND_PERMISSIONS[selectedRole].permissionsDescription.map(
              (permission) => (
                <Inline as="li" key={permission} gap="3" alignItems="center">
                  <CheckCircleIcon size="5" color="iconSuccess" />
                  <Text fontSize="sm">{permission}</Text>
                </Inline>
              )
            )}
            {ROLES_AND_PERMISSIONS[selectedRole].restrictionsDescription.map(
              (restriction) => (
                <Inline as="li" key={restriction} gap="3" alignItems="center">
                  <CloseCircleIcon size="5" color="iconError" />
                  <Text fontSize="sm">{restriction}</Text>
                </Inline>
              )
            )}
          </Stack>
        </Stack>
      </Stack>
    </Page>
  );
}
