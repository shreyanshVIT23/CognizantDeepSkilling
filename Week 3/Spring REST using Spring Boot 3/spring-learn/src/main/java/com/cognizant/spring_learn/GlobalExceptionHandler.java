package com.cognizant.spring_learn;

import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import tools.jackson.databind.exc.InvalidFormatException;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            @NonNull MethodArgumentNotValidException ex,
            @NonNull HttpHeaders headers,
            @NonNull HttpStatusCode statusCode,
            @NonNull WebRequest request
            ) {
        LOGGER.info("Start");
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", new Date());
        body.put("status", statusCode.value());
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .toList();
        body.put("errors", errors);
        LOGGER.info("End");
        return new ResponseEntity<>(body, headers, statusCode);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex,
            @NonNull HttpHeaders headers,
            HttpStatusCode status,
            @NonNull WebRequest request
    ) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", new Date());
        body.put("status", status.value());
        body.put("error", "Bad Request");
        if (ex.getCause() instanceof InvalidFormatException cause) {
            for (InvalidFormatException.Reference ref : cause.getPath()) {
                body.put(
                        "message",
                        "Incorrect format for field '" +
                                ref.getDescription() + "'"
                );
            }
        }
        return new ResponseEntity<>(body, headers, status);
    }
}
