import { Alert, Snackbar } from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";

const SnackbarContext = createContext(
  (msg: string, severity: "error" | "success" | "info" | "warning") => {}
);

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState({
    message: "",
    open: false,
    severity: "info",
  });

  const showSnackbar = (
    message: string,
    severity: "error" | "success" | "info" | "warning"
  ) => {
    setSnackbar({ message, severity, open: true });
  };

  const handleClose = (_: any, reason?: string) => {
    if (reason !== "clickaway") {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }
  };
  return (
    <SnackbarContext.Provider value={showSnackbar}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbar.message}
        />
        {children}

    </SnackbarContext.Provider>
  );
};
