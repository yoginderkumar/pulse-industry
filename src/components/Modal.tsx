import {
  useDialog,
  FocusScope,
  OverlayContainer,
  AriaOverlayProps as OverlayProps,
  OverlayProvider,
  useModal,
  useOverlay,
  usePreventScroll,
} from "react-aria";
import { useOverlayTriggerState } from "@react-stately/overlays";
import classNames from "classnames";
import React, { useContext, useMemo, useRef } from "react";
import { ArrowLeftIcon, CloseIcon } from "./Icons";
import { CSSTransition } from "react-transition-group";
import { BoxOwnProps } from "./Box";
import { Inline } from "./Inline";

// eslint-disable-next-line react-refresh/only-export-components
export { useOverlayTriggerState, OverlayProvider };

const ModalContext = React.createContext<{
  hasContext: boolean;
}>({
  hasContext: false,
});

function ModalInner(
  props: OverlayProps & {
    title: string;
    children: React.ReactNode;
    autoFocus?: boolean;
    size?: "sm" | "md" | "lg";
    status?: "error" | "info" | "warning" | "success";
    onBackPress?: () => void;
    containerRef: React.RefObject<HTMLDivElement>;
  }
) {
  const {
    title,
    children,
    autoFocus = true,
    status,
    containerRef,
    onBackPress,
  } = props;

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const ref = containerRef;
  const { overlayProps } = useOverlay(props, ref);

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll();
  const { modalProps } = useModal();

  // Get props for the dialog and its title
  const { dialogProps, titleProps } = useDialog(props as never, ref);

  const modalContext = useMemo(() => {
    return {
      hasContext: true,
    };
  }, []);

  return (
    <OverlayContainer>
      <div
        className="fixed z-50 top-0 right-0 bottom-0 left-0 bg-black bg-opacity-40 overflow-x-hidden overflow-y-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <FocusScope contain restoreFocus autoFocus={autoFocus}>
          <ModalContext.Provider value={modalContext}>
            <div
              className={classNames("relative w-auto px-3", {
                "max-w-xl": !props.size || props.size === "sm",
                "max-w-4xl": props.size === "md",
                "max-w-6xl": props.size === "lg",
              })}
              style={{
                // this allows us to center align the inner content
                // NOTE: we remove the margins
                minHeight: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                {...overlayProps}
                {...dialogProps}
                {...modalProps}
                ref={ref}
                className={classNames(
                  "bg-white text-gray-900 w-full rounded-lg"
                )}
              >
                <ModalHeader className="relative">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      {onBackPress ? (
                        <ArrowLeftIcon cursor="pointer" onClick={onBackPress} />
                      ) : null}
                      <h3
                        {...titleProps}
                        className={`mt-0 font-medium text-lg ${
                          status === "success"
                            ? "text-green-900"
                            : status === "error"
                            ? "text-red-900"
                            : ""
                        }`}
                      >
                        {title}
                      </h3>
                    </div>
                    {props.onClose ? (
                      <button
                        className="h-8 px-2 inline-flex items-center border rounded"
                        onClick={() => props.onClose?.()}
                      >
                        <CloseIcon className="inline-block w-6 h-6" />
                      </button>
                    ) : null}
                  </div>
                </ModalHeader>
                {children}
              </div>
            </div>
          </ModalContext.Provider>
        </FocusScope>
      </div>
    </OverlayContainer>
  );
}

export function Modal(
  props: Omit<React.ComponentProps<typeof ModalInner>, "containerRef">
) {
  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const ref = useRef<HTMLDivElement>(null);
  return (
    <CSSTransition
      in={props.isOpen}
      timeout={100}
      nodeRef={ref}
      classNames={{
        // FADE-in-out
        // enter start position
        enter: "transform scale-95 opacity-0",
        enterActive:
          "transition duration-100 ease-out transform !scale-100 !opacity-100",
        // enter end position
        enterDone: "transform scale-100 opacity-100",
        // exiting position
        exitActive:
          "transition duration-100 ease-out transform !scale-95 !opacity-0",
      }}
      unmountOnExit
    >
      <ModalInner {...props} containerRef={ref} />
    </CSSTransition>
  );
}

function ModalHeader({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={classNames(
        className,
        "px-4 pt-4 pb-4 sm:px-8 sm:pt-6 border-b border-gray-100"
      )}
      {...props}
    />
  );
}

export function ModalBody({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  autoMaxHeight?: boolean;
}) {
  const { hasContext } = useContext(ModalContext);
  return (
    <div
      className={classNames(
        "max-h-[calc(100vh-80px*2-73px-98px)] overflow-auto",
        className,
        !hasContext
          ? {
              "pb-4 sm:pb-6": true,
            }
          : {
              "py-4 sm:py-5 px-4 sm:px-8": true,
            }
      )}
      {...props}
    />
  );
}

export function ModalFooter({
  className,
  actionsLayout,
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ref,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  BoxOwnProps & {
    actionsLayout?: "auto" | "row";
  }) {
  const { hasContext } = useContext(ModalContext);
  return (
    <Inline
      alignItems="center"
      justifyContent="end"
      className={classNames(className, "border-t border-gray-100", {
        "px-4 sm:px-8 py-4 sm:py-6": hasContext,
        "pt-4 sm:pt-8": !hasContext,
      })}
      {...props}
    >
      <ModalFooterActions actionsLayout={actionsLayout}>
        {children}
      </ModalFooterActions>
    </Inline>
  );
}

export function ModalFooterActions({
  className,
  actionsLayout,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  actionsLayout?: "auto" | "row";
}) {
  return (
    <div
      className={classNames(className, "flex gap-4", {
        "flex-row flex-row-reverse items-center": actionsLayout === "row",
      })}
      {...props}
    />
  );
}
