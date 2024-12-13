package com.example.notekeeper.authapi.controller;

import com.example.notekeeper.authapi.entities.User;
import com.example.notekeeper.authapi.services.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RequestMapping("/api/v3/users")
@RestController
public class UserController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{username}")
    public @ResponseBody pb.UserService.GetUserResponse getUser(@PathVariable String username) {
        User user = userService.getUser(username);

        if (user == null) {
            return null;
        }

        return pb.UserService.GetUserResponse
                .newBuilder()
                .setUser(
                        pb.UserService.User
                                .newBuilder()
                                .setFullName(user.getFullName())
                                .setUsername(user.getUsername())
                                .build())
                .build();
    }

    @GetMapping("/{username}/picture")
    public ResponseEntity<Resource> getUserPicture(@PathVariable String username) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(username);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
