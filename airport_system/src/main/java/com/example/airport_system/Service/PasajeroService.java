package com.example.airport_system.Service;

import com.example.airport_system.DTO.PasajeroDTO;

import java.util.List;
import java.util.Optional;

public interface PasajeroService {
    List<PasajeroDTO> listarPasajeros();
    Optional<PasajeroDTO> obtenerPasajeroPorId(Long id);
    PasajeroDTO guardarPasajero(PasajeroDTO pasajeroDTO);
    PasajeroDTO actualizarPasajero(Long id, PasajeroDTO pasajeroDTO);
    void eliminarPasajero(Long id);
}
