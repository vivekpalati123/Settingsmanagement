import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from "react";
import translations from "./translations";

const LanguageContext = createContext(null);

const SUPPORTED = ["English", "Japanese", "Hindi"];
const HTML_LANG = { English: "en", Japanese: "ja", Hindi: "hi" };

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem("language");
    return SUPPORTED.includes(saved) ? saved : "English";
  });

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[language] || "en";
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = useCallback((lang) => {
    setLanguageState(SUPPORTED.includes(lang) ? lang : "English");
  }, []);

  const t = useCallback(
    (key) => {
      const dict = translations[language] || translations.English;
      return dict[key] ?? translations.English[key] ?? key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return ctx;
}
