package com.example.airport_system.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "BACKEND DEL AEROPUERTO FUNCIONANDO CORRECTAMENTE EN EL PUERTO 8080";
    }
}
