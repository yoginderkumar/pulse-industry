import toast from "react-hot-toast";
import {
  AddStoreIcon,
  Button,
  Inline,
  InputAreaField,
  InputField,
  LocationIcon,
  Stack,
  Text,
} from "../components";
import { getLocation } from "../utils";
import { useState } from "react";
import { useAddStore, useReverseGeoLocation } from "../data";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Page from "./Page";

const storeSchema = z.object({
  storeName: z
    .string({
      required_error: "Please enter a valid store name",
    })
    .nonempty(),
  storeAbout: z
    .string({
      required_error: "This field is required",
    })
    .nonempty()
    .min(50, "Please at least 50 characters into this field.")
    .max(300, "This field should not have more than 300 characters."),
  addressLine1: z
    .string({ required_error: "Please enter a valid address!" })
    .nonempty(),
  cityAndState: z
    .string({ required_error: "This is a required field!" })
    .nonempty(),
  pinCode: z
    .string({ required_error: "Please enter a valid pin code!" })
    .nonempty(),
});

type AddStoreForm = {
  storeName: string;
  storeAbout: string;
  addressLine1: string;
  cityAndState: string;
  pinCode: string;
};

export default function AddNewStorePage() {
  const navigate = useNavigate();
  const getLocationInString = useReverseGeoLocation();
  const addStoreForm = useForm<AddStoreForm>({
    resolver: zodResolver(storeSchema),
  });
  const { control, setValue, handleSubmit } = addStoreForm;
  const [isGettingLocation, setIsGettingLocation] = useState<boolean>(false);
  const [isAddingStore, setIsAddingStore] = useState<boolean>(false);
  const addStore = useAddStore();
  async function getLocationSaved() {
    setIsGettingLocation(true);
    try {
      const [lat, long] = await getLocation();
      const { address_line1, road, state, postcode } =
        await getLocationInString(lat, long);
      setValue("addressLine1", address_line1 + road);
      setValue("cityAndState", state);
      setValue("pinCode", postcode);
      setIsGettingLocation(false);
    } catch (e) {
      setIsGettingLocation(false);
      toast.error("Please allow us location permission!");
    }
  }

  const addThisStoreClick = async (data: AddStoreForm) => {
    setIsAddingStore(true);
    try {
      const storeId = await addStore({
        name: data.storeName,
        about: data.storeAbout,
        address: {
          addressLine1: data.addressLine1,
          cityAndState: data.cityAndState,
          pinCode: data.pinCode,
        },
      });
      if (storeId) {
        navigate(`/dashboard/stores/${storeId}`);
        setIsAddingStore(false);
        return toast.success("Store added successfully!");
      }
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
      setIsAddingStore(false);
    }
  };

  return (
    <Page backTo="/dashboard/home" title="Add New Store">
      <Stack paddingY="4" paddingX="6" gap="3">
        <Text>Add a new store</Text>
        <Stack gap="2">
          <Controller
            control={control}
            name="storeName"
            render={(props) => {
              const {
                field: { onChange, value },
                fieldState: { error },
              } = props;
              return (
                <InputField
                  name="storeName"
                  placeholder="Store Name"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="storeAbout"
            render={(props) => {
              const {
                field: { onChange, value },
                fieldState: { error },
              } = props;
              return (
                <InputAreaField
                  name="storeAbout"
                  rows={4}
                  label="About Store"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="addressLine1"
            render={(props) => {
              const {
                field: { onChange, value },
                fieldState: { error },
              } = props;
              return (
                <InputField
                  name="addressLine1"
                  label="Address Line 1"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                />
              );
            }}
          />
          <Inline gap="2">
            <Controller
              control={control}
              name="cityAndState"
              render={(props) => {
                const {
                  field: { onChange, value },
                  fieldState: { error },
                } = props;
                return (
                  <InputField
                    name="cityAndState"
                    placeholder="City & State"
                    onChange={onChange}
                    value={value}
                    error={error?.message}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="pinCode"
              render={(props) => {
                const {
                  field: { onChange, value },
                  fieldState: { error },
                } = props;
                return (
                  <InputField
                    name="pinCode"
                    placeholder="Pin code"
                    onChange={onChange}
                    value={value}
                    error={error?.message}
                  />
                );
              }}
            />
          </Inline>
        </Stack>
        <Inline gap="2" marginTop="4">
          <Button
            mode="outlined"
            onClick={getLocationSaved}
            loading={isGettingLocation}
          >
            <Inline gap="2">
              {isGettingLocation ? null : <LocationIcon size="5" />}
            </Inline>
          </Button>
          <Button
            fullWidth
            disabled={isGettingLocation}
            loading={isAddingStore}
            onClick={handleSubmit(addThisStoreClick)}
          >
            {isGettingLocation ? null : <AddStoreIcon size="5" />} Add This
            Store
          </Button>
        </Inline>
      </Stack>
    </Page>
  );
}
