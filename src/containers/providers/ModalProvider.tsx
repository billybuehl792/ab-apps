import {
  type ContextType,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import ModalContext from "@/store/context/ModalContext";
import ConfirmDialog from "@/components/modals/ConfirmDialog";

const ModalProvider = ({ children }: PropsWithChildren) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmOptions, setConfirmOptions] =
    useState<Parameters<ContextType<typeof ModalContext>["confirm"]>[0]>();
  const [confirmResolver, setConfirmResolver] = useState<
    ((result: boolean) => void) | null
  >(null);

  /** Callbacks */

  const handleConfirm: ContextType<typeof ModalContext>["confirm"] =
    useCallback((options) => {
      setConfirmOptions(options);
      setConfirmOpen(true);

      return new Promise<boolean>((resolve) => {
        setConfirmResolver(() => resolve);
      });
    }, []);

  const handleCloseConfirm = (result: boolean) => {
    if (confirmResolver) confirmResolver(result);
    setConfirmOpen(false);
    setConfirmResolver(null);
  };

  return (
    <ModalContext
      value={useMemo(() => ({ confirm: handleConfirm }), [handleConfirm])}
    >
      {children}
      <ConfirmDialog
        open={confirmOpen}
        {...(typeof confirmOptions === "string" && { title: confirmOptions })}
        {...(typeof confirmOptions === "object" && {
          title: confirmOptions.title,
          description: confirmOptions.message,
          content: confirmOptions.content,
          confirmButtonText: confirmOptions.confirmButtonText,
        })}
        onConfirm={() => {
          handleCloseConfirm(true);
        }}
        onClose={() => {
          handleCloseConfirm(false);
        }}
        onTransitionExited={() => {
          setConfirmOptions(undefined);
        }}
      />
    </ModalContext>
  );
};

export default ModalProvider;
