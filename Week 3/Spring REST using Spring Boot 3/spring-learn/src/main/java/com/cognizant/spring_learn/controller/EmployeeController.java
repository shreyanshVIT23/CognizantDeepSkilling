package com.cognizant.spring_learn.controller;

import com.cognizant.spring_learn.Employee;
import com.cognizant.spring_learn.exception.EmployeeNotFoundException;
import com.cognizant.spring_learn.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @PutMapping
    public void updateEmployee(
            @RequestBody @Valid Employee employee)
            throws EmployeeNotFoundException {
        employeeService.updateEmployee(employee);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(
            @PathVariable int id)
            throws EmployeeNotFoundException {
        employeeService.deleteEmployee(id);
    }
}