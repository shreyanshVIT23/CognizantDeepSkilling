package com.cognizant.spring_learn;

import com.cognizant.spring_learn.controller.CountryController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@SpringBootTest
@AutoConfigureMockMvc
class SpringLearnApplicationTests {
	@Autowired
	private CountryController countryController;

	@Autowired
	private MockMvc mockMvc;

	@Test
	void contextLoads() {
		assertNotNull(countryController);
	}

	@Test
	void testGetCountry() throws Exception {

		mockMvc.perform(get("/country")
						.with(httpBasic("user", "pwd")))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.code").exists())
				.andExpect(jsonPath("$.code").value("IN"))
				.andExpect(jsonPath("$.name").exists())
				.andExpect(jsonPath("$.name").value("India"));
	}

	@Test
	void testGetCountryException() throws Exception {

		mockMvc.perform(get("/country/az")
						.with(httpBasic("user", "pwd")))
				.andExpect(status().isNotFound())
				.andExpect(status().reason("Country Not Found"));
	}

}
