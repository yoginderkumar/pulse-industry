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

export function StoreIcon(props: IconProps) {
  return (
    <Icon {...props} fill="currentColor" viewBox="0 -960 960 960">
      <path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
    </Icon>
  );
}

export function AddStoreIcon(props: IconProps) {
  return (
    <Icon {...props} fill="currentColor" viewBox="0 -960 960 960">
      <path d="M720-40v-120H600v-80h120v-120h80v120h120v80H800v120h-80ZM80-160v-240H40v-80l40-200h600l40 200v80h-40v120h-80v-120H440v240H80Zm80-80h200v-160H160v160Zm-38-240h516-516ZM80-720v-80h600v80H80Zm42 240h516l-24-120H146l-24 120Z" />
    </Icon>
  );
}

export function LocationIcon(props: IconProps) {
  return (
    <Icon {...props} fill="currentColor" viewBox="0 -960 960 960">
      <path d="M440-42v-80q-125-14-214.5-103.5T122-440H42v-80h80q14-125 103.5-214.5T440-838v-80h80v80q125 14 214.5 103.5T838-520h80v80h-80q-14 125-103.5 214.5T520-122v80h-80Zm40-158q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-120q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400Zm0-80Z" />
    </Icon>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Icon {...props} fill="currentColor" viewBox="0 -960 960 960">
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </Icon>
  );
}

export function LocationOnIcon(props: IconProps) {
  return (
    <Icon {...props} fill="currentColor" viewBox="0 -960 960 960">
      <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
    </Icon>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <Icon {...props} fill="currentColor" viewBox="0 -960 960 960">
      <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
    </Icon>
  );
}

export function InventoryIcon(props: IconProps) {
  return (
    <Icon {...props} fill="currentColor" viewBox="0 -960 960 960">
      <path d="M200-80q-33 0-56.5-23.5T120-160v-451q-18-11-29-28.5T80-680v-120q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v120q0 23-11 40.5T840-611v451q0 33-23.5 56.5T760-80H200Zm0-520v440h560v-440H200Zm-40-80h640v-120H160v120Zm200 280h240v-80H360v80Zm120 20Z" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props} fill="currentColor" viewBox="0 -960 960 960">
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </Icon>
  );
}
