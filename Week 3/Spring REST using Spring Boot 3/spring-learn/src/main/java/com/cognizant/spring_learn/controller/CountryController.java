package com.cognizant.spring_learn.controller;

import com.cognizant.spring_learn.service.CountryService;
import jakarta.validation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.cognizant.spring_learn.Country;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/countries")
public class CountryController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CountryController.class);

    @Autowired
    private CountryService countryService;

    @GetMapping
    public Country getCountryIndia() {
        LOGGER.info("START getCountryIndia");
        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        Country country = context.getBean("country", Country.class);
        LOGGER.debug("Country : {}", country);
        LOGGER.info("END getCountryIndia");
        return country;
    }

    @GetMapping("/{code}")
    public Country getCountry(@PathVariable String code) {
        LOGGER.info("START getCountry");
        Country country = countryService.getCountry(code);
        LOGGER.debug("Country : {}", country);
        LOGGER.info("END getCountry");
        return country;
    }

    @PostMapping
    public Country addCountry(@Valid @RequestBody Country country) {
        LOGGER.info("Start");
        LOGGER.info("Country : {}", country);
        return country;
    }
}