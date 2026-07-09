package com.cognizant.microservicespringlearn.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExampleController {
    @GetMapping("/get")
    public String get() {
        return "Hello World";
    }
}
