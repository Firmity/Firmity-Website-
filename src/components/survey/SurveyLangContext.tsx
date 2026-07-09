"use client";
// Survey-scoped target language for the per-question translate buttons.
// This is deliberately LOCAL to a single survey view (React state), so choosing a
// language while viewing one survey never leaks to the home screen, other surveys,
// or another role's session. The global Settings default only SEEDS the initial value.

import { createContext, useContext } from "react";

export type SurveyLang = { lang: string; setLang: (l: string) => void };

export const SurveyLangContext = createContext<SurveyLang>({ lang: "en", setLang: () => {} });

export const useSurveyLang = (): SurveyLang => useContext(SurveyLangContext);
