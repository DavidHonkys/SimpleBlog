package com.tieto.javabootcamp.application;

import com.tieto.javabootcamp.model.user.User;
import com.tieto.javabootcamp.repository.UserRepository;

import com.tieto.javabootcamp.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
@EntityScan("com.tieto.javabootcamp.model")
@ComponentScan({"com.tieto.javabootcamp.service","com.tieto.javabootcamp.dao"})
public class DatabaseApplication implements CommandLineRunner {

	private static final Logger log = LoggerFactory.getLogger(DatabaseApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(DatabaseApplication.class, args);
	}

	@Autowired
	private UserService userService;

	@Override
	public void run(String... args) throws Exception {

		userService.createUser("Anicka");
		userService.createUser("Frantisek");
		userService.createUser("Standa");
		userService.createUser("Anicka");

		// fetch all users
		log.info("Users found with getAllUsers():");
		log.info("-------------------------------");
		for (User user : userService.getAllUsers()) {
			log.info(user.toString());
		}
		log.info("");

		// fetch all users of same name
		log.info("Users found with getUsersByName():");
		log.info("-------------------------------");
		for (User user : userService.getUsersByName("Anicka")) {
			log.info(user.toString());
		}
		log.info("");

		// fetch an individual user by name
		User userFrantisek = userService.getUser("Frantisek");
		log.info("User found with getUser(\"Frantisek\"):");
		log.info("--------------------------------");
		log.info(userFrantisek.toString());
		log.info("");

		boolean wasDeleted = userService.removeUser("Frantisek");
		log.info("User deletion:");
		log.info("-------------------------------");
		log.info("Deletion of user was successful: {}", wasDeleted);

	}

}
