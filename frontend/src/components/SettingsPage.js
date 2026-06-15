import React from "react";
import SettingsList from "./SettingsList";

function SettingsPage() {
  return (
    <div className="app-container">

      <div className="sidebar">
        <h2>Settings</h2>

        <div className="menu-item">🌙 Theme</div>
        <div className="menu-item">🌐 Language</div>
        <div className="menu-item">🔤 Font Size</div>
        <div className="menu-item">🔒 Privacy</div>
        <div className="menu-item">🔔 Notifications</div>
      </div>

      <div className="content">
        <h1>Configuration Dashboard</h1>

        <SettingsList />
      </div>

    </div>
  );
}

export default SettingsPage;