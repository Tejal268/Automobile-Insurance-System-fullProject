package com.example.demo.dto;


import lombok.Data;

import java.time.LocalDate;

@Data
public class ProposalRequest {
    private String vehicleNumber;
    private String vehicleType;
    private LocalDate registrationDate;
    private Long userId;
}

