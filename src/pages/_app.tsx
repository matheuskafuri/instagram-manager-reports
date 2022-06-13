import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { InsightsContextProvider } from "../context/insights";
import { AuthProvider } from "../context/auth";
import { SearchContextProvider } from "../context/search";
import { AccountsContextProvider } from "../context/accounts";

import createEmotionCache from "../utility/createEmotionCache";
import lightThemeOptions from "../styles/theme/lightThemeOptions";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <AuthProvider>
      <AccountsContextProvider>
        <InsightsContextProvider>
          <SearchContextProvider>
            <CacheProvider value={emotionCache}>
              <Head>
                <meta
                  name="viewport"
                  content="initial-scale=1, width=device-width"
                />
              </Head>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </CacheProvider>
          </SearchContextProvider>
        </InsightsContextProvider>
      </AccountsContextProvider>
      <ToastContainer />
    </AuthProvider>
  );
};

export default MyApp;
