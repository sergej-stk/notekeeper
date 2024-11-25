package com.example.notekeeper.authapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendForwardController {

    /*@GetMapping("/socket.io/")
    public String proxySocketIO() {
        // Hier kannst du einen Mechanismus implementieren, um das Ereignis vom Client zu empfangen
        // und eine Verbindung zum Remote-Server herzustellen oder Daten weiterzuleiten.

        return "forward:/localhost:8086/socket.io"; // Beispiel wie du Anfragen weiterleiten würdest
    }*/
    @RequestMapping(value = "{path:^(?!api|js|fonts|css)[^\\.]*}/**")
    public String redirect() {
        // Forward to home page so that route is preserved.
        return "forward:/";
    }
}
