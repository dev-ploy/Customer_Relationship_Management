package com.CRM.project.controller;

import com.CRM.project.dao.AuthResponse;
import com.CRM.project.dao.LoginRequest;
import com.CRM.project.dao.SignUpRequest;
import com.CRM.project.service.impl.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    private AuthService authService;
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignUpRequest request){
        try{
            AuthResponse response=authService.signup(request);
            return ResponseEntity.ok(response);
        }catch(RuntimeException e){
            return ResponseEntity.badRequest().body(new AuthResponse(null,null,null,null,e.getMessage()));
        }
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request){
        try{
            AuthResponse response=authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new AuthResponse(null,null,null,null,e.getMessage()));
        }
    }
    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("auth endpoint is working!");
    }
}
