package com.CRM.project.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class WelcomeController {

    @GetMapping("/")
    public Map<String, Object> welcome() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "🎉 CRM Backend API is running!");
        response.put("status", "UP");
        response.put("version", "1.0.0");
        response.put("endpoints", new String[]{
                "/api/auth/signup - Register new user",
                "/api/auth/login - User login",
                "/api/customers - Customer management",
                "/actuator/health - Health check"
        });
        response.put("documentation", "https://github.com/dev-ploy/Customer_Relationship_Management");
        return response;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Backend is healthy");
        return response;
    }
}
