package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "*")
public class AutomobileInsuranceSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(AutomobileInsuranceSystemApplication.class, args);
		System.out.println("Project started...");
	}

}
