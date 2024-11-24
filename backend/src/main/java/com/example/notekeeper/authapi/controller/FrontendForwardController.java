package com.example.notekeeper.authapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendForwardController {

    @RequestMapping(value = "{path:^(?!api|js|fonts|css)[^\\.]*}/**")
    public String redirect() {
        // Forward to home page so that route is preserved.
        return "forward:/";
    }
}
