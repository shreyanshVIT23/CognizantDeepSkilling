package com.cognizant.orm_learn.service;

import com.cognizant.orm_learn.model.Country;
import com.cognizant.orm_learn.repository.CountryRepository;
import com.cognizant.orm_learn.service.exception.CountryNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {
    @Autowired
    private CountryRepository countryRepository;

    @Transactional()
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    @Transactional
    public Country getCountryByCode(String code) throws CountryNotFoundException {
        Optional<Country> countries = countryRepository.findById(code);
        if (countries.isPresent()) {
            return countries.get();
        } else  {
            throw new CountryNotFoundException(
                    "Country with code: [" + code + "] not found."
            );
        }
    }
}
