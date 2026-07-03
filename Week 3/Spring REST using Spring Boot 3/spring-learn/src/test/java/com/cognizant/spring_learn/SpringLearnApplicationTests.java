package com.cognizant.spring_learn;

import com.cognizant.spring_learn.controller.CountryController;
import com.cognizant.spring_learn.dao.EmployeeDAO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SpringLearnApplicationTests {
	@Autowired
	private CountryController countryController;

	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private EmployeeDAO employeeDAO;

	@BeforeEach
	void setUp() {
		employeeDAO.init();
	}
	@Test
	void contextLoads() {
		assertNotNull(countryController);
	}

	@Test
	void testGetCountry() throws Exception {

		mockMvc.perform(get("/countries")
						.with(httpBasic("user", "pwd")))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.code").exists())
				.andExpect(jsonPath("$.code").value("IN"))
				.andExpect(jsonPath("$.name").exists())
				.andExpect(jsonPath("$.name").value("India"));
	}

	@Test
	void testGetCountryException() throws Exception {
		mockMvc.perform(get("/countries/az")
						.with(httpBasic("user", "pwd")))
				.andExpect(status().isNotFound())
				.andExpect(status().reason("Country Not Found"));
	}
	@Test
	void testPutCountry() throws Exception {
		String json = """
        {
          "id": 1,
          "name": "John",
          "salary": 50000,
          "permanent": true,
          "dateOfBirth": "12/03/1998",
          "department": {
            "id": 1,
            "name": "IT"
          },
          "skillList": [
            {
              "id": 1,
              "name": "Java"
            },
            {
              "id": 2,
              "name": "Spring Boot"
            }
          ]
        }
        """;

		mockMvc.perform(put("/employees")
						.with(httpBasic("user","pwd"))
						.contentType(MediaType.APPLICATION_JSON)
						.content(json))
				.andExpect(status().isOk());
	}
	@Test
	void testPutEmployeeNotFound() throws Exception {
		String json = """
        {
          "id": 999,
          "name": "John",
          "salary": 50000,
          "permanent": true,
          "dateOfBirth": "12/03/1998",
          "department": {
            "id": 1,
            "name": "IT"
          },
          "skillList": [
            {
              "id": 1,
              "name": "Java"
            },
            {
              "id": 2,
              "name": "Spring Boot"
            }
          ]
        }
        """;

		mockMvc.perform(put("/employees")
						.with(httpBasic("user","pwd"))
						.contentType(MediaType.APPLICATION_JSON)
						.content(json))
				.andExpect(status().isNotFound());
	}
	@Test
	void testDeleteEmployeeSuccess() throws Exception {
		mockMvc.perform(delete("/employees/1")
				.with(httpBasic("user","pwd")))
				.andExpect(status().isOk());
	}
	@Test
	void testDeleteEmployeeNotFound() throws Exception {
		mockMvc.perform(delete("/employees/999")
						.with(httpBasic("user","pwd")))
				.andExpect(status().isNotFound());
	}
}
