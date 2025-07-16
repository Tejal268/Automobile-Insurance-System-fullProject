package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name = "quotes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Quote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "premium_amount", nullable = false)
    private double amount;

    private LocalDate expiryDate;

    @OneToOne
    @JoinColumn(name = "proposal_id", nullable = false)
    @JsonIgnore  // ✅ Add this line
    private Proposal proposal;
}
