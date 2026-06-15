package com.example.settingsapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.settingsapp.model.Setting;

public interface SettingRepository extends JpaRepository<Setting, Long> {

}