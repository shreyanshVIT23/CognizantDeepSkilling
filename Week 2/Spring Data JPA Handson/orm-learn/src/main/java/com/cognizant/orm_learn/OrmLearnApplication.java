package com.cognizant.orm_learn;

import com.cognizant.orm_learn.model.Country;
import com.cognizant.orm_learn.service.CountryService;
import com.cognizant.orm_learn.service.exception.CountryNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.List;

@SpringBootApplication
public class OrmLearnApplication {

	private static final Logger LOGGER = LoggerFactory.getLogger(OrmLearnApplication.class);

	private static CountryService countryService;

	public static void main(String[] args) {

		LOGGER.info("Inside main()");

		SpringApplication.run(OrmLearnApplication.class, args);

		LOGGER.info("Application started");

		ApplicationContext context = SpringApplication.run(OrmLearnApplication.class, args);
		countryService = context.getBean(CountryService.class);

		testGetAllCountries();
		testFindCountryByCode();
	}

	private static void testGetAllCountries() {
		LOGGER.info("Start testGetAllCountries()");

		List<Country> countries = countryService.getAllCountries();

		LOGGER.debug("countries={}", countries);

		LOGGER.info("End testGetAllCountries()");
	}

	private static void testFindCountryByCode()
			throws CountryNotFoundException {

		LOGGER.info("Start testFindCountryByCode()");

		Country country =
				countryService.getCountryByCode("IN");

		LOGGER.debug("Country={}", country);

		LOGGER.info("End testFindCountryByCode()");
	}

}
