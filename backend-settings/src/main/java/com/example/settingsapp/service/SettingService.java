package com.example.settingsapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.settingsapp.model.Setting;
import com.example.settingsapp.repository.SettingRepository;

@Service
public class SettingService {

    @Autowired
    private SettingRepository settingRepository;

    public List<Setting> getAllSettings() {
        return settingRepository.findAll();
    }

    public Setting saveSetting(Setting setting) {
        return settingRepository.save(setting);
    }

    public Setting updateSetting(Long id, Setting updated) {

        Setting setting = settingRepository.findById(id)
                .orElseThrow();

        setting.setTheme(updated.getTheme());
        setting.setLanguage(updated.getLanguage());
        setting.setFontSize(updated.getFontSize());
        setting.setNotifications(updated.getNotifications());
        setting.setPrivacyMode(updated.getPrivacyMode());

        return settingRepository.save(setting);
    }

    public void deleteSetting(Long id) {
        settingRepository.deleteById(id);
    }
}