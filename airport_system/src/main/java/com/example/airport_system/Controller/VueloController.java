package com.example.airport_system.Controller;

import com.example.airport_system.DTO.VueloDTO;
import com.example.airport_system.Service.VueloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/system/vuelos")
@CrossOrigin(origins = "http://localhost:5173")
public class VueloController {

    @Autowired
    private VueloService vueloService;

    @GetMapping("/listar")
    public List<VueloDTO> listarVuelos() {
        return vueloService.listarVuelos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VueloDTO> obtenerVueloPorId(@PathVariable Long id) {
        return vueloService.obtenerVueloPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/registrar")
    public VueloDTO crearVuelo(@RequestBody VueloDTO vueloDTO) {
        return vueloService.guardarVuelo(vueloDTO);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<VueloDTO> actualizarVuelo(@PathVariable Long id, @RequestBody VueloDTO vueloDTO) {
        return ResponseEntity.ok(vueloService.actualizarVuelo(id, vueloDTO));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<VueloDTO> cambiarEstado(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String nuevoEstado = body.get("estado");
        VueloDTO vuelo = vueloService.obtenerVueloPorId(id)
                .orElseThrow(() -> new RuntimeException("Vuelo no encontrado"));

        vuelo.setEstado(nuevoEstado);
        VueloDTO actualizado = vueloService.actualizarVuelo(id, vuelo);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminarVuelo(@PathVariable Long id) {
        vueloService.eliminarVuelo(id);
        return ResponseEntity.noContent().build();
    }
}