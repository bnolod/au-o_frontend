import { Alert, Snackbar, AlertColor } from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";

interface SnackbarContextType {
  showSnackbar: (message: string, severity: "error" | "success" | "info" | "warning") => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<{
    message: string;
    open: boolean;
    severity: AlertColor;
  }>({
    message: "",
    open: false,
    severity: "info",
  });

  const showSnackbar = (
    message: string,
    severity: AlertColor
  ) => {
    setSnackbar({ message, severity, open: true });
  };

  const handleClose = (_: any, reason?: string) => {
    if (reason !== "clickaway") {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      <Snackbar
        open={snackbar.open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};
