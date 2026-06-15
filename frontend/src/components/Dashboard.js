import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import SettingsPanel from "./SettingsPanel";
import { saveSettings, getSettings } from "../services/api";
import { useTranslation } from "../i18n/LanguageContext";

function Dashboard() {
  const { t, setLanguage } = useTranslation();
  const [settings, setSettings] = useState({
    theme: "Light",
    language: "English",
    fontSize: "Medium",
    notifications: true,
    privacyMode: false
  });

  // Load the most recently saved settings when the page opens
  useEffect(() => {
    getSettings()
      .then((res) => {
        const all = res.data;
        if (Array.isArray(all) && all.length > 0) {
          // pick the last non-empty saved row
          const valid = all.filter((s) => s.theme && s.fontSize);
          const latest = valid.length > 0 ? valid[valid.length - 1] : null;
          if (latest) {
            setSettings({
              theme: latest.theme,
              language: latest.language,
              fontSize: latest.fontSize,
              notifications: !!latest.notifications,
              privacyMode: !!latest.privacyMode
            });
            if (latest.language) {
              setLanguage(latest.language);
            }
          }
        }
      })
      .catch(() => {});
  }, [setLanguage]);

  // Actually APPLY theme + font size to the page whenever they change
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", (settings.theme || "Light").toLowerCase());
    root.setAttribute("data-font", (settings.fontSize || "Medium").toLowerCase());
  }, [settings.theme, settings.fontSize]);

  const save = async () => {
    try {
      await saveSettings(settings);
      alert(t("settingsSaved"));
    } catch (error) {
      alert(t("errorSaving"));
    }
  };

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <SettingsPanel
          settings={settings}
          setSettings={setSettings}
        />

        <button
          className="save-btn"
          onClick={save}
        >
          {t("saveSettings")}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;