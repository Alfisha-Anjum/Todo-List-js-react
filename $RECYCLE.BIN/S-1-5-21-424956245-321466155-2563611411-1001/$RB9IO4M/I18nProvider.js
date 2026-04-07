"use client"; // Ensures this runs on the client side

import i18next from "../i18next"; // Import your i18n configuration
import { I18nextProvider } from "react-i18next";
// Import your i18n configuration

export default function I18nProvider({ children }) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
