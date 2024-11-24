package com.example.notekeeper.authapi.services.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfiguration(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            AuthenticationProvider authenticationProvider
    ) {
        this.authenticationProvider = authenticationProvider;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        String[] resources = new String[]{
            "/", "^/api/v3.*", "/home", "/pictureCheckCode", "/include/**", "/fonts/**",
            "/css/**", "/icons/**", "/images/**", "/js/**", "/layer/**", "/api/v3/auth/**", "/index.html"
        };
        http.headers().cacheControl();

        http.csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers("/api/v3/auth/**").permitAll() // Erlaubt alle Anfragen an /api/v3/auth/**
                .requestMatchers("/api/v3/**") // Alle anderen Anfragen an /api/v3/** erfordern Authentifizierung
                .authenticated()
                .anyRequest()
                .permitAll()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        http.cors();
        return http.build();
    }

    /*  @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("http://localhost:8080/"));
        configuration.setAllowedMethods(List.of("GET","POST", "PUT", "DELETE"));
        //configuration.setAllowedHeaders(List.of("Authorization","Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**",configuration);

        return source;
    }*/
    public static class CustomRequestMatcher implements RequestMatcher {

        private static final String EXCLUDED_PATH = "^(?!/api/v3/).*"; // Regex, um "/api/v3/**" auszuschließen
        private final RegexRequestMatcher excludedMatcher = new RegexRequestMatcher(EXCLUDED_PATH, null);

        @Override
        public boolean matches(HttpServletRequest request) {
            // Wenn der Pfad mit "/api/v3/" beginnt, wird der Request ausgeschlossen
            return excludedMatcher.matches(request);
        }
    }
}
