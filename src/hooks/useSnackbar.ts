import { useState } from "react";
import type { SnackbarState } from "types/types";

export default function useSnackbar() {
  const [snackbarState, setSnackbarState] = useState<SnackbarState | null>(
    null
  );

  const openSnackbar = (state: SnackbarState) => {
    setSnackbarState(state);
  };

  const closeSnackbar = () => {
    setSnackbarState(null);
  };

  return {
    snackbarState,
    openSnackbar,
    closeSnackbar,
  };
}
