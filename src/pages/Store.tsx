import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Amount,
  Box,
  Button,
  DataLoadingFallback,
  Inline,
  InputField,
  InventoryIcon,
  PlusIcon,
  SettingsIcon,
  Stack,
  Text,
} from "../components";
import Page from "./Page";
import { SuspenseWithPerf } from "reactfire";
import { STORE_PERMISSIONS, useProducts, useStore } from "../data";
import { useMemo, useState } from "react";

export default function StorePage() {
  const { storeId } = useParams();
  if (!storeId) return null;
  return (
    <SuspenseWithPerf
      fallback={<DataLoadingFallback label="Loading store details..." />}
      traceId="loading_store_details"
    >
      <Store key={storeId} storeId={storeId} />
    </SuspenseWithPerf>
  );
}

function Store({ storeId }: { storeId: string }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const { store, checkIfAuthenticatedTeamMemberCan } = useStore(storeId);
  const { products } = useProducts(storeId);
  const canAddMoreProducts = checkIfAuthenticatedTeamMemberCan(
    STORE_PERMISSIONS.ADD_PRODUCT
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  return (
    <Page
      backTo="/dashboard/home"
      title={store.name || "Welcome to your store"}
      actions={
        <Box as={Link} to="settings">
          <SettingsIcon />
        </Box>
      }
    >
      <Stack gap="6" paddingX="6" paddingY="1" position="relative">
        <Stack>
          <Stack gap="4">
            <Box
              position="sticky"
              top="0"
              backgroundColor="surfaceDefault"
              paddingY="3"
            >
              <Text
                as="h4"
                fontSize="lg"
                fontWeight="medium"
                color="textPrimary"
              >
                Products
              </Text>
            </Box>
            <InputField
              name="search"
              value={search}
              placeholder="Search by name"
              label="Search Product"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Stack>
          {products?.length ? (
            <Stack gap="6">
              {filteredProducts.length ? (
                <Stack as="ul" gap="3">
                  {filteredProducts.map((product) => (
                    <Inline
                      key={product.id}
                      borderWidth="1"
                      borderColor="borderSeparator"
                      rounded="md"
                      paddingY="3"
                      paddingX="4"
                      gap="4"
                      onClick={() => navigate(`products/${product.id}`)}
                    >
                      <Box>
                        <InventoryIcon />
                      </Box>
                      <Stack gap="3">
                        <Stack gap="1">
                          <Inline alignItems="center" justifyContent="between">
                            <Text fontSize="sm" fontWeight="semibold">
                              {product.name}
                            </Text>
                            <Inline fontSize="sm">
                              <Amount amount={product.price} />
                              <Text>/Piece</Text>
                            </Inline>
                          </Inline>
                          <Box className="line-clamp-3">
                            <Text fontSize="xs">{product.description}</Text>
                          </Box>
                        </Stack>
                        {product.tags?.length ? (
                          <Inline as="ul" gap="2" flexWrap="wrap">
                            {product.tags.map((tag, i) => (
                              <Inline
                                key={i}
                                as="li"
                                rounded="md"
                                style={{ padding: "2px 8px" }}
                                alignItems="center"
                                backgroundColor="surfacePrimaryLowest"
                              >
                                <Text
                                  fontSize="xs"
                                  color="textPrimary"
                                  fontWeight="medium"
                                >
                                  {tag}
                                </Text>
                              </Inline>
                            ))}
                          </Inline>
                        ) : null}
                      </Stack>
                    </Inline>
                  ))}
                </Stack>
              ) : (
                <Stack gap="1" textAlign="center">
                  <Text fontSize="xs" fontWeight="medium">
                    No products found with this name!
                  </Text>
                  <Text fontSize="xs">Try something else.</Text>
                </Stack>
              )}
            </Stack>
          ) : (
            <Stack
              gap="2"
              textAlign="center"
              alignItems="center"
              justifyContent="center"
            >
              <InventoryIcon color="iconLow" />
              <Stack paddingX="8">
                <Text color="textMedium" fontWeight="semibold">
                  No Products Found!
                </Text>
                <Text fontSize="sm">
                  Add products available at your store in simplest way possible!
                </Text>
              </Stack>
              {canAddMoreProducts ? (
                <Box marginTop="2">
                  <Button path="add-new-product">Add New Product</Button>
                </Box>
              ) : null}
            </Stack>
          )}
        </Stack>
      </Stack>
      {canAddMoreProducts && products.length > 0 ? (
        <Box position="fixed" style={{ bottom: 32, right: 24 }}>
          <Button path="add-new-product">
            <PlusIcon />
            Add More
          </Button>
        </Box>
      ) : null}
    </Page>
  );
}
