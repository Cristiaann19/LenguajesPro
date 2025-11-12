package com.example.airport_system.Service;

import com.example.airport_system.DTO.VueloDTO;
import java.util.List;
import java.util.Optional;

public interface VueloService {
    List<VueloDTO> listarVuelos();
    Optional<VueloDTO> obtenerVueloPorId(Long id);
    VueloDTO guardarVuelo(VueloDTO vueloDTO);
    VueloDTO actualizarVuelo(Long id, VueloDTO vueloDTO);
    void eliminarVuelo(Long id);
}
