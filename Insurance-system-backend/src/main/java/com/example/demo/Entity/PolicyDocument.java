package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "policy_documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PolicyDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String documentUrl; // Or store file as byte[] if needed
    private LocalDate issuedDate;

    @OneToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;
}

