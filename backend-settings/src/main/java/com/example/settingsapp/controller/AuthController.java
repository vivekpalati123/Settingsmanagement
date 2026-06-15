package com.example.settingsapp.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.settingsapp.model.User;
import com.example.settingsapp.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> data) {

        boolean valid = userService.login(
                data.get("email"),
                data.get("password"));

        return valid ? "SUCCESS" : "INVALID";
    }
}