package com.example.demo.controller;

import com.example.demo.Entity.User;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.ResetPasswordRequest;
import com.example.demo.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserOfficerController {

    private final UserServiceImpl userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse jwt = userService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(jwt);
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        boolean isReset = userService.resetPassword(request.getEmail(), request.getNewPassword());
        if (!isReset) {
            return ResponseEntity.status(404).body("User not found");
        }
        return ResponseEntity.ok("Password reset successful");
    }


}
