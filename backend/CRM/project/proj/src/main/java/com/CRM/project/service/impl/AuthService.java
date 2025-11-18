package com.CRM.project.service.impl;

import com.CRM.project.dao.AuthResponse;
import com.CRM.project.dao.LoginRequest;
import com.CRM.project.dao.SignUpRequest;
import com.CRM.project.entity.User;
import com.CRM.project.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PassEncoderService pcs;
    @Autowired
    private JwtService jwts;
    @Transactional
    public AuthResponse signup(SignUpRequest request){
        if(userRepo.existsByEmail(request.getEmail())){
            throw new RuntimeException("email already exists");
        }
        User user=new User();
        user.setEmail(request.getEmail());
        user.setPassword(pcs.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        userRepo.save(user);
        String token=jwts.generateToken(user.getEmail());
        return new AuthResponse(token, user.getEmail(), user.getFirstName(), user.getLastName(),"user registered succesfully");
    }
    public AuthResponse login(LoginRequest request){
        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("invalid email or password"));
        if(!pcs.matches(request.getPassword(),user.getPassword())){
            throw new RuntimeException("invalid password or email");
        }
        if(!user.isEnabled()){
            throw new RuntimeException("account is disabled");
        }
        String token=jwts.generateToken(user.getEmail());
        return new AuthResponse(token,user.getEmail(),user.getFirstName(), user.getLastName(), "login succesfull");
    }
}
