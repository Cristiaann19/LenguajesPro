package com.example.airport_system.Service;

import com.example.airport_system.DTO.PagoDTO;

import java.util.List;
import java.util.Optional;

public interface PagoService {
    List<PagoDTO> listarPagos();
    Optional<PagoDTO> obtenerPagoPorId(Long id);
    PagoDTO guardarPago(PagoDTO pagoDTO);
    PagoDTO actualizarPago(Long id, PagoDTO pagoDTO);
    void eliminarPago(Long id);

}
