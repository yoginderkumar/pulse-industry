import { useParams } from "react-router-dom";
import {
  Button,
  CloseIcon,
  DataLoadingFallback,
  Inline,
  InputAreaField,
  InputField,
  PlusIcon,
  Stack,
  Text,
} from "../components";
import { SuspenseWithPerf } from "reactfire";
import Page from "./Page";
import { useAddProduct, useStore } from "../data";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useState } from "react";

export default function AddNewProductPage() {
  const { storeId } = useParams();
  if (!storeId) return null;
  return (
    <SuspenseWithPerf
      fallback={<DataLoadingFallback label="Loading store details..." />}
      traceId="loading_store_details"
    >
      <AddNewProduct key={storeId} storeId={storeId} />
    </SuspenseWithPerf>
  );
}

type AddProductForm = {
  name: string;
  description: string;
  tags?: string[];
  price: number;
  inventory: number;
};

const addProductSchema = z
  .object({
    name: z
      .string({
        required_error: "Please enter a valid product name",
      })
      .min(4)
      .nonempty(),
    description: z
      .string({
        required_error: "This field is required",
      })
      .nonempty()
      .min(50, "Please at least 50 characters into this field.")
      .max(300, "This field should not have more than 300 characters."),
    price: z
      .number({ required_error: "Please enter a valid price!" })
      .nonnegative(),
    inventory: z
      .number({ required_error: "This is a required field!" })
      .nonnegative(),
  })
  .superRefine(({ price, inventory }, ctx) => {
    if (price < 1) {
      return ctx.addIssue({
        code: "custom",
        path: ["price"],
        message: "Please enter a valid price for the product!",
      });
    }
    if (inventory < 1) {
      return ctx.addIssue({
        code: "custom",
        path: ["inventory"],
        message: "Please enter a valid number of products available!",
      });
    }
  });

function AddNewProduct({ storeId }: { storeId: string }) {
  const { store } = useStore(storeId);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);
  const addProductForm = useForm<AddProductForm>({
    resolver: zodResolver(addProductSchema),
  });
  const addProduct = useAddProduct(storeId);

  const { control, handleSubmit, getValues, setValue } = addProductForm;

  async function addProductClick() {
    setIsAddingProduct(true);
    try {
      const data = getValues();
      const productId = await addProduct({
        ...data,
        tags: data.tags,
        availableStock: data.inventory,
      });
      if (productId) {
        setIsAddingProduct(false);
        setValue("name", "");
        setValue("description", "");
        setValue("inventory", 0);
        setValue("price", 0);
        setValue("tags", []);
        toast.success("Added product successfully!");
      }
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
      setIsAddingProduct(false);
    }
  }

  return (
    <Page
      backTo={`/dashboard/stores/${storeId}`}
      title={`Add New Product - ${store.name} `}
    >
      <Stack paddingX="6" paddingY="4" gap="4">
        <Stack gap="3">
          <Stack gap="2">
            <Controller
              control={control}
              name="name"
              render={(props) => {
                const {
                  field: { onChange, value },
                  fieldState: { error },
                } = props;
                return (
                  <InputField
                    name="name"
                    placeholder="Product Name"
                    onChange={onChange}
                    value={value}
                    error={error?.message}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="description"
              render={(props) => {
                const {
                  field: { onChange, value },
                  fieldState: { error },
                } = props;
                return (
                  <InputAreaField
                    name="description"
                    placeholder="Product Description"
                    onChange={onChange}
                    value={value}
                    error={error?.message}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="price"
              render={(props) => {
                const {
                  field: { onChange, value },
                  fieldState: { error },
                } = props;
                return (
                  <InputField
                    type="number"
                    name="price"
                    label="Product Price"
                    placeholder="Price in INR"
                    onChange={(e) => onChange(Number(e.target.value))}
                    value={value}
                    error={error?.message}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="tags"
              render={(props) => {
                const {
                  field: { onChange, value },
                  fieldState: { error },
                } = props;
                return (
                  <Stack gap="2" paddingBottom="1">
                    <InputField
                      name="tag"
                      noMargin
                      placeholder="Product Tags"
                      onChange={(e) => setCurrentTag(e.currentTarget.value)}
                      value={currentTag}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setCurrentTag("");
                          onChange(
                            value?.length
                              ? [...value, currentTag]
                              : [currentTag]
                          );
                        }
                      }}
                      error={error?.message}
                    />
                    <Inline as="ul" gap="2" overflowX="auto" paddingBottom="2">
                      {value?.map((tag, i) => (
                        <Inline
                          key={i}
                          as="li"
                          rounded="md"
                          style={{ padding: "2px 4px" }}
                          alignItems="center"
                          gap="1"
                          backgroundColor="surfacePrimaryLowest"
                        >
                          <Text
                            fontSize="xs"
                            color="textPrimary"
                            fontWeight="medium"
                          >
                            {tag}
                          </Text>
                          <CloseIcon
                            size="3"
                            color="iconMedium"
                            onClick={() =>
                              onChange(value.filter((t) => t !== tag))
                            }
                          />
                        </Inline>
                      ))}
                    </Inline>
                  </Stack>
                );
              }}
            />

            <Controller
              control={control}
              name="inventory"
              render={(props) => {
                const {
                  field: { onChange, value },
                  fieldState: { error },
                } = props;
                return (
                  <InputField
                    name="inventory"
                    placeholder="Available Stock/Inventory"
                    onChange={(e) => onChange(Number(e.target.value))}
                    value={value}
                    error={error?.message}
                  />
                );
              }}
            />
          </Stack>

          <Button
            fullWidth
            onClick={handleSubmit(addProductClick)}
            loading={isAddingProduct}
          >
            {" "}
            <PlusIcon /> Add Product
          </Button>
        </Stack>
      </Stack>
    </Page>
  );
}
