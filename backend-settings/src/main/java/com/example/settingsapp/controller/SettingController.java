package com.example.settingsapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.settingsapp.model.Setting;
import com.example.settingsapp.service.SettingService;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class SettingController {

    @Autowired
    private SettingService settingService;

    @GetMapping
    public List<Setting> getAllSettings() {
        return settingService.getAllSettings();
    }

    @PostMapping
    public Setting saveSetting(@RequestBody Setting setting) {

        System.out.println("================================");
        System.out.println("Theme: " + setting.getTheme());
        System.out.println("Language: " + setting.getLanguage());
        System.out.println("Font Size: " + setting.getFontSize());
        System.out.println("Notifications: " + setting.getNotifications());
        System.out.println("Privacy Mode: " + setting.getPrivacyMode());
        System.out.println("================================");

        return settingService.saveSetting(setting);
    }

    @PutMapping("/{id}")
    public Setting updateSetting(
            @PathVariable Long id,
            @RequestBody Setting setting) {

        return settingService.updateSetting(id, setting);
    }

    @DeleteMapping("/{id}")
    public String deleteSetting(@PathVariable Long id) {

        settingService.deleteSetting(id);

        return "Deleted Successfully";
    }
}