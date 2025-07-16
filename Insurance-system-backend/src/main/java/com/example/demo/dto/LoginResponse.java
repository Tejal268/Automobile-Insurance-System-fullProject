package com.example.demo.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String name;
    private String email;
    private String designation;
    private Long id;
    private Boolean isOfficer;
}
