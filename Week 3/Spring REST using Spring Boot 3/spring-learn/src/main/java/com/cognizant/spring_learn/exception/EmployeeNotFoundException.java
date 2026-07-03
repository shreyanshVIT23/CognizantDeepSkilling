package com.cognizant.spring_learn.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
        value = HttpStatus.NOT_FOUND,
        reason = "Country Not Found"
)
public class EmployeeNotFoundException extends RuntimeException {
    public EmployeeNotFoundException(String message) {
        super(message);
    }
    public EmployeeNotFoundException() {
        super("Employee Not Found");
    }
}
