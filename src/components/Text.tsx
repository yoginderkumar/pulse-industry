import type { ElementType } from "react";
import { forwardRef } from "react";
import {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from "./polymorphism";
import { Box, BoxOwnProps } from "./Box";
import { TTextStyles, textStyles } from "./css/text.css";
import classNames from "classnames";

const DefaultTextElement = "p";

type TextOwnProps = TTextStyles;

export type TextProps<C extends React.ElementType = typeof DefaultTextElement> =
  PolymorphicComponentPropWithRef<C, BoxOwnProps & TextOwnProps>;

type TextComponent = <C extends React.ElementType = typeof DefaultTextElement>(
  props: TextProps<C>
) => React.ReactNode;

export const Text: TextComponent = forwardRef(
  <C extends React.ElementType = typeof DefaultTextElement>(
    {
      as,
      textTransform,
      fontSize,
      fontWeight,
      whiteSpace,
      ...restProps
    }: TextProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Element: ElementType = as || DefaultTextElement;
    return (
      <Box
        {...restProps}
        color={restProps.color}
        className={classNames(
          textStyles({
            textTransform,
            whiteSpace,
            fontSize,
            fontWeight,
          })
        )}
        as={Element}
        ref={ref}
      />
    );
  }
);
