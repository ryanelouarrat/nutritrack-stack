package com.nutriTrack.nutriTrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.core.json.JsonReadFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class NutriTrackApplication {

	public static void main(String[] args) {
		SpringApplication.run(NutriTrackApplication.class, args);
	}
	@Bean
	public ObjectMapper objectMapper() {
		return JsonMapper.builder()
				.enable(JsonReadFeature.ALLOW_NON_NUMERIC_NUMBERS)
				.addModule(new Jdk8Module())  // Register the JDK8 module
				.addModule(new JavaTimeModule())  // Register the JavaTime module for LocalDate and LocalDateTime
				.build();
	}
}
