import { EffectCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  Button,
  CloseIcon,
  DataLoadingFallback,
  Inline,
  InputAreaField,
  InputField,
  PencilIcon,
  Stack,
  Text,
} from "../components";
import { SuspenseWithPerf } from "reactfire";
import Page from "./Page";
import {
  STORE_PERMISSIONS,
  useEnsuredProduct,
  useStore,
  useUpdateProduct,
} from "../data";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { storeId, productId } = useParams();
  if (!storeId || !productId) return null;
  return (
    <SuspenseWithPerf
      fallback={<DataLoadingFallback label="Loading store details..." />}
      traceId="loading_store_details"
    >
      <Product key={storeId} storeId={storeId} productId={productId} />
    </SuspenseWithPerf>
  );
}

type UpdateProductForm = {
  name: string;
  description: string;
  tags?: string[];
  price: number;
  inventory: number;
};

const updateProductSchema = z
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

function Product({
  storeId,
  productId,
}: {
  storeId: string;
  productId: string;
}) {
  const {
    store,
    isDeleted: isStoreDeleted,
    checkIfAuthenticatedTeamMemberCan,
  } = useStore(storeId);
  const { product, isDeleted } = useEnsuredProduct(productId);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);
  const updatedProductForm = useForm<UpdateProductForm>({
    resolver: zodResolver(updateProductSchema),
  });
  const updateProduct = useUpdateProduct(productId);

  const { control, handleSubmit, getValues, setValue } = updatedProductForm;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  useMount(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("tags", product.tags);
      setValue("inventory", product.inventory.left || 0);
    }
  });

  async function addProductClick() {
    setIsAddingProduct(true);
    try {
      const data = getValues();
      const productId = await updateProduct({
        ...data,
        tags: data.tags,
        availableStock: data.inventory,
      });
      if (productId) {
        setIsAddingProduct(false);
        toast.success("Product updated successfully!");
      }
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
      setIsAddingProduct(false);
    }
  }

  const canUpdateProduct = checkIfAuthenticatedTeamMemberCan(
    STORE_PERMISSIONS.UPDATE_PRODUCT
  );
  const canUpdateInventory = checkIfAuthenticatedTeamMemberCan(
    STORE_PERMISSIONS.UPDATE_INVENTORY
  );

  if (isDeleted) {
    <Navigate to={`/dashboard/stores/${storeId}`} />;
  }
  if (isStoreDeleted) {
    <Navigate to="/dashboard/home" />;
  }

  return (
    <Page
      backTo={`/dashboard/stores/${storeId}`}
      title={`${product.name} - ${store.name} `}
    >
      <Stack paddingX="6" paddingY="4" gap="4">
        <Stack gap="3">
          {isEdit ? (
            <Inline paddingBottom="2">
              <Text fontSize="xs" color="textSuccess">
                {canUpdateProduct
                  ? "You can make changes to the product"
                  : canUpdateInventory
                  ? "You can only update the inventory for the product"
                  : ""}
              </Text>
            </Inline>
          ) : (
            <Stack alignItems="end">
              <Button onClick={() => setIsEdit(true)}>
                <PencilIcon /> Edit Product
              </Button>
            </Stack>
          )}
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
                    disabled={!isEdit || !canUpdateProduct}
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
                    disabled={!isEdit || !canUpdateProduct}
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
                    disabled={!isEdit || !canUpdateProduct}
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
                      disabled={!isEdit || !canUpdateProduct}
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
                    disabled={!isEdit || !canUpdateInventory}
                    placeholder="Available Stock/Inventory"
                    onChange={(e) => onChange(Number(e.target.value))}
                    value={value}
                    error={error?.message}
                  />
                );
              }}
            />
          </Stack>

          {isEdit ? (
            <Button
              fullWidth
              onClick={handleSubmit(addProductClick)}
              loading={isAddingProduct}
            >
              Save Changes
            </Button>
          ) : null}
        </Stack>
      </Stack>
    </Page>
  );
}

function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

function useMount(fn: () => void) {
  useEffectOnce(() => {
    fn();
  });
}
