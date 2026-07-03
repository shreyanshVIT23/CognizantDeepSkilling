package com.cognizant.spring_learn.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;



public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(JwtAuthorizationFilter.class);

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
        LOGGER.info("Start");
        LOGGER.debug("AuthenticationManager: {}", authenticationManager);
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest req,
            @NonNull HttpServletResponse res,
            @NonNull FilterChain chain)
            throws IOException, ServletException {

        LOGGER.info("Start");

        String header = req.getHeader("Authorization");

        LOGGER.debug("Authorization Header: {}", header);

        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication =
                getAuthentication(req);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        chain.doFilter(req, res);

        LOGGER.info("End");
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {

        String token = request.getHeader("Authorization");

        if (token != null) {

            try {

                Jws<Claims> jws = Jwts.parser()
                        .verifyWith(JwtUtil.KEY)
                        .build()
                        .parseSignedClaims(token.replace("Bearer ", ""));

                String user = jws.getPayload().getSubject();

                LOGGER.debug("User: {}", user);

                if (user != null) {
                    return new UsernamePasswordAuthenticationToken(
                            user,
                            null,
                            new ArrayList<>());
                }

            } catch (JwtException ex) {

                LOGGER.error("Invalid JWT", ex);

                return null;
            }
        }

        return null;
    }
}