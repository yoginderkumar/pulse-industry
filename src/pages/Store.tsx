import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Amount,
  Box,
  Button,
  DataLoadingFallback,
  Inline,
  InventoryIcon,
  PlusIcon,
  SettingsIcon,
  Stack,
  Text,
} from "../components";
import Page from "./Page";
import { SuspenseWithPerf } from "reactfire";
import { useProducts, useStore } from "../data";

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
  const { store } = useStore(storeId);
  const { products, fetchMore } = useProducts(storeId);
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
          <Box
            position="sticky"
            top="0"
            backgroundColor="surfaceDefault"
            paddingY="3"
          >
            <Text as="h4" fontSize="lg" fontWeight="medium" color="textPrimary">
              Products
            </Text>
          </Box>
          {products?.length ? (
            <Stack gap="6">
              <Stack as="ul" gap="3">
                {products.map((product) => (
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
                      <Inline flexWrap="wrap" gap="2">
                        <Box fontSize="xs">
                          <Text>Available Items: {product.inventory.left}</Text>
                        </Box>
                        <Box fontSize="xs">
                          <Text>Sold Items: {product.inventory.sold}</Text>
                        </Box>
                        <Box fontSize="xs">
                          <Text>Total Items: {product.inventory.total}</Text>
                        </Box>
                      </Inline>
                    </Stack>
                  </Inline>
                ))}
              </Stack>
              <Button onClick={fetchMore}>Fetch More</Button>
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
              <Box marginTop="2">
                <Button path="add-new-product">Add New Product</Button>
              </Box>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Box position="fixed" style={{ bottom: 32, right: 24 }}>
        <Button path="add-new-product">
          <PlusIcon />
          Add More
        </Button>
      </Box>
    </Page>
  );
}
