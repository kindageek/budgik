import { createContext } from "react";
import type { SnackbarState } from '../types/types';

const SnackbarContext = createContext({
  openSnackbar: (state: SnackbarState) => {
    return;
  },
});

export default SnackbarContext;
