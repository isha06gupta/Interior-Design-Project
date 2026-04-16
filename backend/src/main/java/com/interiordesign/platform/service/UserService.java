package com.interiordesign.platform.service;

import com.interiordesign.platform.dto.LoginResponse;
import com.interiordesign.platform.entity.User;

public interface UserService {
    User registerUser(User user);
    LoginResponse loginUser(String email, String password);
}