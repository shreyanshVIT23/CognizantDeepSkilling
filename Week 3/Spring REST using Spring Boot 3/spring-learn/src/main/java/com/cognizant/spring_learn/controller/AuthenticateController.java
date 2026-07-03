package com.cognizant.spring_learn.controller;

import com.cognizant.spring_learn.security.JwtUtil;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthenticateController {
    private static final Logger LOGGER =
            LoggerFactory.getLogger(AuthenticateController.class);


    @GetMapping("/authenticate")
    public Map<String, String> authenticate(
            @RequestHeader("Authorization") String authHeader) {
        LOGGER.info("START authenticate");
        LOGGER.debug("Authorization Header : {}", authHeader);
        String user = getUser(authHeader);
        LOGGER.debug("Authenticated User : {}", user);
        String token = generateJwt(user);
        LOGGER.debug("Generated Token : {}", token);
        Map<String, String> map = new HashMap<>();
        map.put("token", token);
        LOGGER.info("END authenticate");
        return map;
    }

    private String getUser(String authHeader) {
        LOGGER.debug("START getUser");
        String encodedCredentials = authHeader.substring(6);
        LOGGER.debug("Encoded Credentials : {}", encodedCredentials);
        byte[] decodedBytes =
                Base64.getDecoder().decode(encodedCredentials);
        String decodedCredentials =
                new String(decodedBytes, StandardCharsets.UTF_8);
        LOGGER.debug("Decoded Credentials : {}", decodedCredentials);
        String user = decodedCredentials.substring(
                0,
                decodedCredentials.indexOf(":")
        );
        LOGGER.debug("Username : {}", user);
        LOGGER.debug("END getUser");
        return user;
    }

    private String generateJwt(String user) {
        LOGGER.debug("START generateJwt");
        String token = Jwts.builder()
                .subject(user)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1_200_000))
                .signWith(JwtUtil.KEY)
                .compact();
        LOGGER.debug("Generated JWT: {}", token);
        LOGGER.debug("END generateJwt");
        return token;
    }
}
