import type { ElementType } from "react";
import React, { forwardRef, useMemo } from "react";
import {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from "./polymorphism";
import { Box, BoxOwnProps } from "./Box";
import { TTextStyles, textStyles } from "./css/text.css";
import classNames from "classnames";
import { SuspenseWithPerf } from "reactfire";
import { normalizeNumber } from "../utils";

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

export const Amount = React.forwardRef<
  HTMLSpanElement,
  TextProps<"span"> & {
    amount: number;
  }
>(function Amount({ amount, ...props }, ref) {
  return (
    <Text
      as="span"
      ref={ref}
      itemScope
      itemType="http://schema.org/UnitPriceSpecification"
      {...props}
    >
      <Box as="span" itemProp="priceCurrency">
        ₹
      </Box>
      <Box itemProp="price" display="inline">
        <SuspenseWithPerf
          fallback={normalizeNumber(amount)}
          traceId="intl_format"
        >
          <LocalizedNumber number={amount} />
        </SuspenseWithPerf>
      </Box>
    </Text>
  );
});

export const LocalizedNumber = React.forwardRef<
  HTMLSpanElement,
  TextProps<"span"> & {
    number: number;
  }
>(function LocalizedNumber({ number, ...props }, ref) {
  const format = useMemo((newOptions?: Intl.NumberFormatOptions) => {
    const maximumFractionDigits =
      newOptions?.maximumFractionDigits === undefined
        ? 2
        : newOptions?.maximumFractionDigits;
    return new Intl.NumberFormat(`en-IN`, {
      ...newOptions,
      maximumFractionDigits,
    }).format;
  }, []);
  return (
    <Text as="span" {...props} ref={ref}>
      {format(number)}
    </Text>
  );
});
