package com.qima.QimaStore.controllers;

import com.qima.QimaStore.configs.JwtTokenProvider;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(),
                            authRequest.getPassword())
            );

            String token = jwtTokenProvider.createToken(authentication);

            Map<String, String> response = new HashMap<>();
            response.put("username", authRequest.getUsername());
            response.put("token", token);

            return response;
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid username/password supplied");
        }
    }
}

@Data
class AuthRequest {
    private String username;
    private String password;

    // getters and setters
}

@Data
class AuthResponse {
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    // getters and setters
}
