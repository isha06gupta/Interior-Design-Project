package com.interiordesign.platform.service.impl;

import com.interiordesign.platform.dto.LoginResponse;
import com.interiordesign.platform.entity.User;
import com.interiordesign.platform.repository.UserRepository;
import com.interiordesign.platform.security.JwtUtil;
import com.interiordesign.platform.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public UserServiceImpl(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }
        return userRepository.save(user);
    }

    @Override
    public LoginResponse loginUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Email not found"));

        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new LoginResponse(token, user.getEmail(), user.getId());
    }
}