package com.example.demo;

import com.example.demo.Entity.Payment;
import com.example.demo.Entity.Policy;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.repository.PolicyDocumentRepository;
import com.example.demo.service.PolicyServiceImpl;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;
import java.util.Arrays;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(MockitoExtension.class)
class PolicyServiceImplTest {

    @Mock private PolicyDocumentRepository policyRepo;
    @Mock private PaymentRepository paymentRepo;

    @InjectMocks
    private PolicyServiceImpl policyService;

    
    @Test
    void testGetAllPolicies() {
        when(policyRepo.findAll()).thenReturn(Arrays.asList(new Policy(), new Policy()));

        List<Policy> result = policyService.getAllPolicies();

        assertEquals(2, result.size());
    }
}

