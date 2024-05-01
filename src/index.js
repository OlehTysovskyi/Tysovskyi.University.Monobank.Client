import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/reset.css";
import "./styles/fonts.css";
import "./styles/styles.css";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/authContext";
import Navigation from "./components/Navigation";

//Sentry
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://0adb5d0e38b9255aaaeb553610f67aa8@o4507180142624768.ingest.de.sentry.io/4507180147212368",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
