import { ToastPosition, Toaster } from "react-hot-toast";

export interface Props {
  pos?: ToastPosition | undefined;
}

export const Alert = (props: Props) => {
  return (
    <div>
      <Toaster
        position={props.pos ? props.pos : "bottom-center"}
        reverseOrder={false}
        toastOptions={{
          error: {
            style: {
              background: "var(--background-brighter)",
              color: "var(--font-white)",
            },
          },
          success: {
            style: {
              background: "var(--background-brighter)",
              color: "var(--font-white)",
            },
          },
        }}
      />
    </div>
  );
};
