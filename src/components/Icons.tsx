import { forwardRef } from "react";
import { PolymorphicRef } from "./polymorphism";
import { BoxProps, Box } from "./Box";
import "./icons.css";

const DefaultElement = "svg";

export type IconComponent = <
  C extends React.ElementType = typeof DefaultElement
>(
  props: BoxProps<C>
) => React.ReactNode;

export type IconProps<C extends React.ElementType = typeof DefaultElement> =
  BoxProps<C>;

export const Icon: IconComponent = forwardRef(
  <C extends React.ElementType = typeof DefaultElement>(
    { as, size = "6", ...rest }: BoxProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Element: React.ElementType = as || DefaultElement;
    return (
      <Box
        {...rest}
        as={Element}
        xmlns="http://www.w3.org/2000/svg"
        display="inlineBlock"
        ref={ref}
        size={size}
      >
        {rest.children}
      </Box>
    );
  }
);

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Icon {...props} viewBox="0 0 24 24">
      <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
    </Icon>
  );
}

export function SpinnerIcon(props: IconProps) {
  return (
    <Icon {...props} className="spinner" fill="none" viewBox="0 0 20 20">
      <g clipPath="url(#SpinnerIcon)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 0.833344C10.4602 0.833344 10.8333 1.20644 10.8333 1.66668V5.00001C10.8333 5.46025 10.4602 5.83334 10 5.83334C9.53977 5.83334 9.16668 5.46025 9.16668 5.00001V1.66668C9.16668 1.20644 9.53977 0.833344 10 0.833344ZM3.51908 3.51909C3.84452 3.19365 4.37216 3.19365 4.69759 3.51909L7.05593 5.87742C7.38136 6.20286 7.38136 6.7305 7.05593 7.05593C6.73049 7.38137 6.20285 7.38137 5.87742 7.05593L3.51908 4.6976C3.19364 4.37216 3.19364 3.84452 3.51908 3.51909ZM16.4809 3.51909C16.8064 3.84452 16.8064 4.37216 16.4809 4.6976L14.1226 7.05593C13.7972 7.38137 13.2695 7.38137 12.9441 7.05593C12.6186 6.7305 12.6186 6.20286 12.9441 5.87742L15.3024 3.51909C15.6278 3.19365 16.1555 3.19365 16.4809 3.51909ZM0.833344 10C0.833344 9.53977 1.20644 9.16668 1.66668 9.16668H5.00001C5.46025 9.16668 5.83334 9.53977 5.83334 10C5.83334 10.4602 5.46025 10.8333 5.00001 10.8333H1.66668C1.20644 10.8333 0.833344 10.4602 0.833344 10ZM14.1667 10C14.1667 9.53977 14.5398 9.16668 15 9.16668H18.3333C18.7936 9.16668 19.1667 9.53977 19.1667 10C19.1667 10.4602 18.7936 10.8333 18.3333 10.8333H15C14.5398 10.8333 14.1667 10.4602 14.1667 10ZM7.05593 12.9441C7.38136 13.2695 7.38136 13.7972 7.05593 14.1226L4.69759 16.4809C4.37216 16.8064 3.84452 16.8064 3.51908 16.4809C3.19364 16.1555 3.19364 15.6279 3.51908 15.3024L5.87742 12.9441C6.20285 12.6186 6.73049 12.6186 7.05593 12.9441ZM12.9441 12.9441C13.2695 12.6186 13.7972 12.6186 14.1226 12.9441L16.4809 15.3024C16.8064 15.6279 16.8064 16.1555 16.4809 16.4809C16.1555 16.8064 15.6278 16.8064 15.3024 16.4809L12.9441 14.1226C12.6186 13.7972 12.6186 13.2695 12.9441 12.9441ZM10 14.1667C10.4602 14.1667 10.8333 14.5398 10.8333 15V18.3333C10.8333 18.7936 10.4602 19.1667 10 19.1667C9.53977 19.1667 9.16668 18.7936 9.16668 18.3333V15C9.16668 14.5398 9.53977 14.1667 10 14.1667Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="SpinnerIcon">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </Icon>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <Icon {...props} fill="currentColor" viewBox="0 -960 960 960">
      <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
    </Icon>
  );
}

export function OfficeIcon(props: IconProps) {
  return (
    <Icon {...props} fill="currentColor" viewBox="0 -960 960 960">
      <path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z" />
    </Icon>
  );
}

export function ShopIcon(props: IconProps) {
  return (
    <Icon {...props} fill="currentColor" viewBox="0 -960 960 960">
      <path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
    </Icon>
  );
}
