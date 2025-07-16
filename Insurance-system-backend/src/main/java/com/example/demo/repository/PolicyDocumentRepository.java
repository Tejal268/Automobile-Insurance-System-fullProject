package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Payment;
import com.example.demo.Entity.Policy;


public interface PolicyDocumentRepository extends JpaRepository<Policy, Long>{

	Optional<Policy> findByPayment(Payment payment);
	List<Policy> findByPayment_User_Id(Long userId);


}
