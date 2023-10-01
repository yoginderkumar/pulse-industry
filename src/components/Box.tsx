import React, { forwardRef } from "react";
import {
  boxColorStyles,
  boxStyles,
  TBoxColorStyles,
  TBoxStyles,
} from "./box.css";
import { sizeStyles, TSizeStyles } from "./css/size.css";
import { transformStyles, TTransformStyles } from "./css/transform.css";
import classnames from "classnames";
import {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from "./polymorphism";
import {
  marginPaddingStyles,
  shadowStyles,
  TMarginPaddingStyles,
  TShadowStyles,
  TOutlineStyles,
} from "./css/common.css";
import { TTextStyles } from "./css/text.css";

const DefaultBoxElement = "div";

export type BoxOwnProps = TBoxColorStyles &
  TSizeStyles &
  TBoxStyles &
  TMarginPaddingStyles &
  TShadowStyles &
  TOutlineStyles &
  Omit<TTransformStyles, "transform">;

export type BoxProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, BoxOwnProps & TTextStyles>;

export type BoxComponent = <
  C extends React.ElementType = typeof DefaultBoxElement
>(
  props: BoxProps<C>
) => React.ReactNode;

export const Box: BoxComponent = forwardRef(
  <C extends React.ElementType = typeof DefaultBoxElement>(
    {
      as,
      color,
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingX,
      paddingY,
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginX,
      marginY,
      bgColor,
      backgroundColor,
      textAlign,
      textDecoration,
      position,
      top,
      right,
      bottom,
      left,
      insetX,
      insetY,
      inset,
      cursor,
      pointerEvents,
      zIndex,
      flexDirection,
      flexGrow,
      flexWrap,
      alignItems,
      alignSelf,
      justifyContent,
      display,
      gap,
      className,
      size,
      width,
      height,
      borderTopWidth,
      borderRightWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderWidth,
      borderXWidth,
      borderYWidth,
      borderColor,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomRightRadius,
      borderBottomLeftRadius,
      borderRadius,
      rounded,
      roundedTopRight,
      roundedTopLeft,
      roundedBottomRight,
      roundedBottomLeft,
      roundedTop,
      roundedRight,
      roundedBottom,
      roundedLeft,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      flex,
      flexShrink,
      overflowX,
      overflowY,
      overflow,
      opacity,
      rotate,
      scaleX,
      scaleY,
      scale,
      shadowLevel,
      visibility,
      fontSize,
      fontWeight,
      borderStyle = "solid",
      ...restProps
    }: BoxProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Element: React.ElementType = as || DefaultBoxElement;
    const transform =
      scale !== undefined ||
      scaleX !== undefined ||
      scaleY !== undefined ||
      rotate !== undefined
        ? "1"
        : undefined;
    return (
      <Element
        ref={ref}
        {...restProps}
        className={classnames(
          boxColorStyles({ color }),
          sizeStyles({
            size,
            width,
            height,
          }),
          transformStyles({ scale, scaleX, scaleY, rotate, transform }),
          shadowStyles({ shadowLevel }),
          marginPaddingStyles({
            padding,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            paddingX,
            paddingY,
            margin,
            marginTop,
            marginRight,
            marginBottom,
            marginLeft,
            marginX,
            marginY,
          }),
          boxStyles({
            bgColor,
            backgroundColor,
            textAlign,
            textDecoration,
            position,
            top,
            right,
            bottom,
            left,
            insetX,
            insetY,
            inset,
            cursor,
            pointerEvents,
            display,
            alignItems,
            alignSelf,
            justifyContent,
            zIndex,
            flexDirection,
            flexGrow,
            flexWrap,
            gap,
            minWidth,
            borderColor,
            borderTopWidth,
            borderRightWidth,
            borderBottomWidth,
            borderLeftWidth,
            borderWidth,
            borderXWidth,
            borderYWidth,
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomRightRadius,
            borderBottomLeftRadius,
            borderRadius,
            borderStyle,
            rounded,
            roundedTopRight,
            roundedTopLeft,
            roundedBottomRight,
            roundedBottomLeft,
            roundedTop,
            roundedRight,
            roundedBottom,
            roundedLeft,
            maxWidth,
            minHeight,
            flex,
            flexShrink,
            overflowX,
            overflowY,
            overflow,
            opacity,
            visibility,
            maxHeight,
            fontSize,
            fontWeight,
          }),
          className
        )}
      />
    );
  }
);
