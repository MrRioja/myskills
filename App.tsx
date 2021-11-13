import React, { useEffect } from "react";
// Code Push
import codePush from "react-native-code-push";

import { StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";

import { Home } from "./src/pages/Home";

import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://38a829e0e647482fbe13eb655fc61ae7@o959685.ingest.sentry.io/6062673",
  tracesSampleRate: 1.0,
});

function App() {
  useEffect(() => {
    throw new Error("My first Sentry error!");

    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE,
    });
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <Home />
    </>
  );
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
