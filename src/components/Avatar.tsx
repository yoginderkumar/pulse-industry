import { ElementType, forwardRef } from "react";
import { BoxOwnProps } from "./Box";
import { Text } from "./Text";
import {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from "./polymorphism";
import { getColorForString } from "generate-colors";
import { Inline } from "./Inline";

const DefaultElement = "div";

export type AvatarOwnProps = Omit<BoxOwnProps, "display"> & {
  id: string;
  name?: string;
};

export type AvatarProps<C extends React.ElementType = typeof DefaultElement> =
  PolymorphicComponentPropWithRef<
    C,
    Omit<BoxOwnProps, "backgroundColor" | "bgColor"> & AvatarOwnProps
  >;

export type AvatarComponent = <
  C extends React.ElementType = typeof DefaultElement
>(
  props: AvatarProps<C>
) => React.ReactNode;

export const Avatar: AvatarComponent = forwardRef(
  <C extends React.ElementType = typeof DefaultElement>(
    { as, id, size = "8", fontSize = "lg", name, ...rest }: AvatarProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Element: ElementType = as || DefaultElement;
    const [r, g, b] = getColorForString(id || name || "user");
    return (
      <Inline
        as={Element}
        ref={ref}
        {...rest}
        size={size}
        rounded="full"
        backgroundColor="surfacePrimary"
        style={{
          color: `rgb(${r}, ${g}, ${b})`,
          background: `rgba(${r}, ${g}, ${b}, .8)`,
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Text color="textOnSurface" fontSize={fontSize}>
          {(name?.[0] || "U").toUpperCase()}
        </Text>
      </Inline>
    );
  }
);
