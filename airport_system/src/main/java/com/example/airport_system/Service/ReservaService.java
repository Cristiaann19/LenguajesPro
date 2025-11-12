package com.example.airport_system.Service;

import com.example.airport_system.DTO.ReservaDTO;

import java.util.List;
import java.util.Optional;

public interface ReservaService {
    List<ReservaDTO> listarReservas();
    Optional<ReservaDTO> obtenerReservaPorId(Long id);
    ReservaDTO guardarReserva(ReservaDTO reservaDTO);
    ReservaDTO actualizarReserva(Long id, ReservaDTO reservaDTO);
    void eliminarReserva(Long id);
}
