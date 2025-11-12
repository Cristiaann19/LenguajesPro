package com.example.airport_system.Service;

import com.example.airport_system.DTO.ReservaDTO;
import com.example.airport_system.Model.Pasajero;
import com.example.airport_system.Model.Reserva;
import com.example.airport_system.Model.Vuelo;
import com.example.airport_system.Repository.PasajeroRepository;
import com.example.airport_system.Repository.ReservaRepository;
import com.example.airport_system.Repository.VueloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservaServiceImpl implements ReservaService{

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private VueloRepository vueloRepository;

    @Autowired
    private PasajeroRepository pasajeroRepository;

    @Override
    public List<ReservaDTO> listarReservas() {
        return reservaRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ReservaDTO> obtenerReservaPorId(Long id) {
        return reservaRepository.findById(id)
                .map(this::convertirADTO);
    }

    @Override
    public ReservaDTO guardarReserva(ReservaDTO dto) {
        Reserva reserva = convertirDesdeDTO(dto);
        return convertirADTO(reservaRepository.save(reserva));
    }

    @Override
    public ReservaDTO actualizarReserva(Long id, ReservaDTO dto) {
        Reserva r = reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
        r.setAsiento(dto.getAsiento());
        r.setEstado(dto.getEstado());
        r.setFechaReserva(dto.getFechaReserva());
        return convertirADTO(reservaRepository.save(r));
    }

    @Override
    public void eliminarReserva(Long id) {
        reservaRepository.deleteById(id);
    }

    private ReservaDTO convertirADTO(Reserva reserva) {
        return ReservaDTO.builder()
                .idReserva(reserva.getIdReserva())
                .idVuelo(reserva.getVuelo().getIdVuelo())
                .idPasajero(reserva.getPasajero().getIdPasajero())
                .fechaReserva(reserva.getFechaReserva())
                .asiento(reserva.getAsiento())
                .estado(reserva.getEstado())
                .build();
    }

    private Reserva convertirDesdeDTO(ReservaDTO dto) {
        Vuelo vuelo = vueloRepository.findById(dto.getIdVuelo())
                .orElseThrow(() -> new RuntimeException("Vuelo no encontrado"));
        Pasajero pasajero = pasajeroRepository.findById(dto.getIdPasajero())
                .orElseThrow(() -> new RuntimeException("Pasajero no encontrado"));

        return Reserva.builder()
                .vuelo(vuelo)
                .pasajero(pasajero)
                .fechaReserva(dto.getFechaReserva())
                .asiento(dto.getAsiento())
                .estado(dto.getEstado())
                .build();
    }
}
