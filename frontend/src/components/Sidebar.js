import React from "react";
import { useTranslation } from "../i18n/LanguageContext";

function Sidebar() {
  const { t } = useTranslation();

  return (
    <div className="sidebar">

      <h2>⚙ {t("settings")}</h2>

      <button>🌙 {t("theme")}</button>

      <button>🌐 {t("language")}</button>

      <button>🔤 {t("fontSize")}</button>

      <button>🔔 {t("notifications")}</button>

      <button>🔒 {t("privacy")}</button>

    </div>
  );
}

export default Sidebar;
