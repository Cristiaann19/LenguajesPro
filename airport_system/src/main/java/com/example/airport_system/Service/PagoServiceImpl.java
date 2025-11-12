package com.example.airport_system.Service;

import com.example.airport_system.DTO.PagoDTO;
import com.example.airport_system.Model.Pago;
import com.example.airport_system.Model.Reserva;
import com.example.airport_system.Repository.PagoRepository;
import com.example.airport_system.Repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PagoServiceImpl implements PagoService{

    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @Override
    public List<PagoDTO> listarPagos() {
        return pagoRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PagoDTO> obtenerPagoPorId(Long id) {
        return pagoRepository.findById(id)
                .map(this::convertirADTO);
    }

    @Override
    public PagoDTO guardarPago(PagoDTO dto) {
        Pago pago = convertirDesdeDTO(dto);
        return convertirADTO(pagoRepository.save(pago));
    }

    @Override
    public PagoDTO actualizarPago(Long id, PagoDTO dto) {
        Pago p = pagoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado"));
        p.setMonto(dto.getMonto());
        p.setMetodoPago(dto.getMetodoPago());
        p.setFechaPago(dto.getFechaPago());
        return convertirADTO(pagoRepository.save(p));
    }

    @Override
    public void eliminarPago(Long id) {
        pagoRepository.deleteById(id);
    }

    private PagoDTO convertirADTO(Pago pago) {
        return PagoDTO.builder()
                .idPago(pago.getIdPago())
                .idReserva(pago.getReserva().getIdReserva())
                .monto(pago.getMonto())
                .metodoPago(pago.getMetodoPago())
                .fechaPago(pago.getFechaPago())
                .build();
    }

    private Pago convertirDesdeDTO(PagoDTO dto) {
        Reserva reserva = reservaRepository.findById(dto.getIdReserva())
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        return Pago.builder()
                .reserva(reserva)
                .monto(dto.getMonto())
                .metodoPago(dto.getMetodoPago())
                .fechaPago(dto.getFechaPago())
                .build();
    }


}
