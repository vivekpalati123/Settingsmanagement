import React from "react";
import { useTranslation } from "../i18n/LanguageContext";

function SettingsPanel({
  settings,
  setSettings
}) {

  const { t, setLanguage } = useTranslation();

  return (

    <div className="settings-card">

      <h2>{t("applicationSettings")}</h2>

      <div className="setting-item">

        <label>{t("theme")}</label>

        <select
          value={settings.theme}
          onChange={(e) =>
            setSettings({
              ...settings,
              theme: e.target.value
            })
          }
        >

          <option value="Light">{t("light")}</option>
          <option value="Dark">{t("dark")}</option>

        </select>

      </div>

      <div className="setting-item">

        <label>{t("language")}</label>

        <select
          value={settings.language}
          onChange={(e) => {
            setSettings({
              ...settings,
              language: e.target.value
            });
            setLanguage(e.target.value);
          }}
        >

          <option value="English">English</option>
          <option value="Japanese">日本語</option>
          <option value="Hindi">हिन्दी</option>

        </select>

      </div>

      <div className="setting-item">

        <label>{t("fontSize")}</label>

        <select
          value={settings.fontSize}
          onChange={(e) =>
            setSettings({
              ...settings,
              fontSize: e.target.value
            })
          }
        >

          <option value="Small">{t("small")}</option>
          <option value="Medium">{t("medium")}</option>
          <option value="Large">{t("large")}</option>

        </select>

      </div>

      <div className="setting-item">

        <label>{t("notifications")}</label>

        <input
          type="checkbox"
          checked={settings.notifications}
          onChange={(e) =>
            setSettings({
              ...settings,
              notifications: e.target.checked
            })
          }
        />

      </div>

      <div className="setting-item">

        <label>{t("privacyMode")}</label>

        <input
          type="checkbox"
          checked={settings.privacyMode}
          onChange={(e) =>
            setSettings({
              ...settings,
              privacyMode: e.target.checked
            })
          }
        />

      </div>

    </div>
  );
}

export default SettingsPanel;
