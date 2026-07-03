package com.cognizant.spring_learn.security;

import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

public class JwtUtil {

    public static final SecretKey KEY =
            Keys.hmacShaKeyFor(
                    "abcdefghijklmnopqrstuvwxyz123456"
                            .getBytes(StandardCharsets.UTF_8));

    private JwtUtil() {
    }
}