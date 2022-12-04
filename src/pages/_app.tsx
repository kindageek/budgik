import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import SnackbarContext from "../context/snackbar.context";
import { useState } from "react";
import Snackbar from "../components/snackbar/snackbar.component";
import { SnackbarState } from "../types/types";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState | null>(
    null
  );

  const openSnackbar = (state: SnackbarState) => {
    setSnackbarState(state);
  };

  const closeSnackbar = () => {
    setSnackbarState(null);
  };

  return (
    <SessionProvider session={session}>
      <SnackbarContext.Provider value={{ openSnackbar }}>
        <Component {...pageProps} />
        <Snackbar
          message={snackbarState?.msg}
          open={snackbarState !== null}
          onClose={closeSnackbar}
          type={snackbarState?.type}
        />
      </SnackbarContext.Provider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
