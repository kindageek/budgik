import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

import { trpc } from "utils";

import "../styles/globals.css";
import SnackbarContext from "context/snackbar.context";
import Snackbar from "../components/snackbar/snackbar.component";
import useSnackbar from "hooks/useSnackbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { snackbarState, openSnackbar, closeSnackbar } = useSnackbar();

  return (
    <SessionProvider session={session}>
      <SnackbarContext.Provider value={{ openSnackbar }}>
        <Component {...pageProps} />
        <Snackbar onClose={closeSnackbar} state={snackbarState} />
        <Analytics />
      </SnackbarContext.Provider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
