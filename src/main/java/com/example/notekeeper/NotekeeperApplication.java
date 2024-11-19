package com.example.notekeeper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.corundumstudio.socketio.SocketIOServer;
import com.example.notekeeper.authapi.repositories.UserRepository;


@SpringBootApplication
@Configuration
public class NotekeeperApplication {

    @Value("${rt-server.host}")
    private String host;

    @Value("${rt-server.port}")
    private Integer port;

    private final UserRepository userRepository;

    public NotekeeperApplication(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    UserDetailsService userDetailsService() {
        return username -> {
            return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        };
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Bean
    public SocketIOServer socketIOServer() {
        com.corundumstudio.socketio.Configuration config = new com.corundumstudio.socketio.Configuration();
        config.setHostname(host);
        config.setPort(port);
        return new SocketIOServer(config);
    }

	public static void main(String[] args) {
		SpringApplication.run(NotekeeperApplication.class, args);
	}

}
