package com.example.airport_system.Controller;

import com.example.airport_system.DTO.PasajeroDTO;
import com.example.airport_system.Service.PasajeroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/system/pasajeros")
@CrossOrigin(origins = "http://localhost:5173")
public class PasajeroController {

    @Autowired
    private PasajeroService pasajeroService;

    @GetMapping
    public List<PasajeroDTO> listarPasajeros() {
        return pasajeroService.listarPasajeros();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PasajeroDTO> obtenerPasajeroPorId(@PathVariable Long id) {
        return pasajeroService.obtenerPasajeroPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PasajeroDTO crearPasajero(@RequestBody PasajeroDTO pasajeroDTO) {
        return pasajeroService.guardarPasajero(pasajeroDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PasajeroDTO> actualizarPasajero(@PathVariable Long id, @RequestBody PasajeroDTO pasajeroDTO) {
        return ResponseEntity.ok(pasajeroService.actualizarPasajero(id, pasajeroDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPasajero(@PathVariable Long id) {
        pasajeroService.eliminarPasajero(id);
        return ResponseEntity.noContent().build();
    }
}
