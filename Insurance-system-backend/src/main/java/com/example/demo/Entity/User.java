package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String role; // USER, OFFICER, ADMIN

    private String address;

    @Column(unique = true, nullable = false)
    private String aadhaarNumber;

    @Column(unique = true, nullable = false)
    private String panNumber;

    private LocalDate dateOfBirth;

    private int age;

    
}
