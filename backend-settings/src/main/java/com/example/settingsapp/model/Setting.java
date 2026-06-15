package com.example.settingsapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "settings")
public class Setting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String theme;

    private String language;

    private String fontSize;

    private Boolean notifications;

    private Boolean privacyMode;

    public Setting() {
    }

    public Long getId() {
        return id;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getFontSize() {
        return fontSize;
    }

    public void setFontSize(String fontSize) {
        this.fontSize = fontSize;
    }

    public Boolean getNotifications() {
        return notifications;
    }

    public void setNotifications(Boolean notifications) {
        this.notifications = notifications;
    }

    public Boolean getPrivacyMode() {
        return privacyMode;
    }

    public void setPrivacyMode(Boolean privacyMode) {
        this.privacyMode = privacyMode;
    }
}