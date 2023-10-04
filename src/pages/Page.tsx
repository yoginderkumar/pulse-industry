import { Link } from "react-router-dom";
import { ArrowLeftIcon, Box, Inline, Text } from "../components";

export default function Page({
  backTo,
  title,
  actions,
  children,
  footer,
}: {
  backTo?: string | React.ReactNode;
  title: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Box position="relative" width="full">
      <Box
        as="nav"
        width="full"
        height="14"
        paddingX="4"
        borderBottomWidth="1"
        zIndex="50"
      >
        <Inline height="full" alignItems="center" gap="4">
          {!backTo ? null : typeof backTo === "string" ? (
            <Link to={backTo}>
              <ArrowLeftIcon size="5" />
            </Link>
          ) : (
            backTo
          )}
          <Box flex="1" className="line-clamp-1">
            <Text as="h1" fontSize="md">
              {title}
            </Text>
          </Box>
          {actions ? <Box>{actions}</Box> : null}
        </Inline>
      </Box>
      <Box
        as="main"
        paddingBottom={footer ? "16" : "0"}
        className="h-screen"
        overflow="auto"
      >
        {children}
      </Box>
      {footer ? (
        <Inline
          as="footer"
          position="fixed"
          bottom="0"
          width="full"
          height="16"
          zIndex="50"
          paddingX="4"
          borderTopWidth="1"
          alignItems="center"
          justifyContent="center"
        >
          {footer}
        </Inline>
      ) : null}
    </Box>
  );
}
