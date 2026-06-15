package com.example.settingsapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.settingsapp.model.User;
import com.example.settingsapp.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user) {
        return userRepository.save(user);
    }

    public boolean login(String email, String password) {

        Optional<User> user = userRepository.findByEmail(email);

        return user.isPresent()
                && user.get().getPassword().equals(password);
    }
}