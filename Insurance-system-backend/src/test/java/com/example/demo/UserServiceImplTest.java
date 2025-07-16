package com.example.demo;

import com.example.demo.Entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void testRegisterUser() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("plain123");

        
        when(passwordEncoder.encode("plain123")).thenReturn("encoded-password");
        when(userRepository.save(any(User.class))).thenReturn(user);
        String message = userService.registerUser(user);
        System.out.println("Register Return: " + message);

        assertEquals("User registered successfully!", message); 
        verify(userRepository).save(user);
    }

    @Test
    void testLogin_Failure() {
       
        when(userRepository.findByEmail("wrong@example.com")).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.login("wrong@example.com", "pass");
        });

        System.out.println("Login Error: " + exception.getMessage());
        assertTrue(exception.getMessage().contains("Invalid email or password"));
    }
}
