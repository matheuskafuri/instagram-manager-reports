import React from "react";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { InsightsContextProvider } from "../context/insights";
import { AuthProvider } from "../context/auth";
import { SearchContextProvider } from "../context/search";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import createEmotionCache from "../utility/createEmotionCache";
import lightThemeOptions from "../styles/theme/lightThemeOptions";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <AuthProvider>
      <InsightsContextProvider>
        <SearchContextProvider>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </CacheProvider>
        </SearchContextProvider>
      </InsightsContextProvider>
      <ToastContainer />
    </AuthProvider>
  );
};

export default MyApp;
