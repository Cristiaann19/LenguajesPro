package com.example.airport_system.Controller;

import com.example.airport_system.Model.Destino;
import com.example.airport_system.Service.DestinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/system/destinos")
@CrossOrigin(origins = "http://localhost:5173")
public class DestinoController {
    
    @Autowired
    private DestinoService destinoService;
    
    @GetMapping
    public ResponseEntity<List<Destino>> obtenerTodos() {
        List<Destino> destinos = destinoService.obtenerTodos();
        return ResponseEntity.ok(destinos);
    }
    
    @GetMapping("/disponibles")
    public ResponseEntity<List<Destino>> obtenerDisponibles() {
        List<Destino> destinos = destinoService.obtenerDisponibles();
        return ResponseEntity.ok(destinos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Destino> obtenerPorId(@PathVariable Long id) {
        return destinoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Destino> crear(@RequestBody Destino destino) {
        Destino nuevoDestino = destinoService.guardar(destino);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoDestino);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Destino> actualizar(@PathVariable Long id, @RequestBody Destino destino) {
        return destinoService.obtenerPorId(id)
                .map(destinoExistente -> {
                    destino.setIdDestino(id);
                    Destino actualizado = destinoService.guardar(destino);
                    return ResponseEntity.ok(actualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        return destinoService.obtenerPorId(id)
                .map(destino -> {
                    destinoService.eliminar(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/buscar")
    public ResponseEntity<List<Destino>> buscarPorCiudad(@RequestParam String ciudad) {
        List<Destino> destinos = destinoService.buscarPorCiudad(ciudad);
        return ResponseEntity.ok(destinos);
    }
}
