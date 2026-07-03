package com.cognizant.spring_learn.service;

import com.cognizant.spring_learn.Employee;
import com.cognizant.spring_learn.dao.EmployeeDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeDAO employeeDao;

    public void updateEmployee(Employee employee) {
        employeeDao.updateEmployee(employee);
    }

    public void deleteEmployee(int id) {
        employeeDao.deleteEmployee(id);
    }
}
