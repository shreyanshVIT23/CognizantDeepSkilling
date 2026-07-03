package com.cognizant.spring_learn.dao;

import com.cognizant.spring_learn.Department;
import com.cognizant.spring_learn.Employee;
import com.cognizant.spring_learn.exception.EmployeeNotFoundException;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Repository
public class EmployeeDAO {
    private List<Employee> employees;
    @PostConstruct
    public void init() {
        employees = new ArrayList<>();

        Department dept = new Department();
        dept.setId(1);
        dept.setName("IT");

        Employee emp = new Employee();
        emp.setId(1);
        emp.setName("John");
        emp.setSalary(BigDecimal.valueOf(50000));
        emp.setPermanent(true);
        emp.setDepartment(dept);

        employees.add(emp);
    }
    public void updateEmployee(Employee employee) {
        for (int i = 0; i < employees.size(); i++) {
            if (employees.get(i).getId().equals(employee.getId())) {
                employees.set(i, employee);
                return;
            }
        }
        throw new EmployeeNotFoundException("Employee not found");
    }
    public void deleteEmployee(int id) {
        boolean removed = employees.removeIf(emp ->
                emp.getId().equals(id));
        if (!removed) {
            throw new EmployeeNotFoundException("Employee not found");
        }
    }
}
