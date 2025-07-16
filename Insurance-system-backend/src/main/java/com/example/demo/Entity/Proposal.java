package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "proposals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Proposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vehicleNumber;
    private String vehicleType;
    private LocalDate registrationDate;
    
    @Enumerated(EnumType.STRING)
    private ProposalStatus status;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore // Hides from Swagger input
    private User user;

    @Transient
    private Long userId; // Used for response only
    
    // Recommended Document Fields
    @Column(name = "document_name")
    private String documentName;

    @Column(name = "document_type")
    private String documentType;

    @Lob
    @Column(name = "document_data",columnDefinition = "LONGBLOB")
    private byte[] documentData;
}
