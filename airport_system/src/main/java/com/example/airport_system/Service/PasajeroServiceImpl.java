package com.example.airport_system.Service;

import com.example.airport_system.DTO.PasajeroDTO;
import com.example.airport_system.Model.Pasajero;
import com.example.airport_system.Repository.PasajeroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PasajeroServiceImpl implements PasajeroService{

    @Autowired
    private PasajeroRepository pasajeroRepository;

    @Override
    public List<PasajeroDTO> listarPasajeros() {
        return pasajeroRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PasajeroDTO> obtenerPasajeroPorId(Long id) {
        return pasajeroRepository.findById(id)
                .map(this::convertirADTO);
    }

    @Override
    public PasajeroDTO guardarPasajero(PasajeroDTO pasajeroDTO) {
        Pasajero pasajero = convertirDesdeDTO(pasajeroDTO);
        Pasajero guardado = pasajeroRepository.save(pasajero);
        return convertirADTO(guardado);
    }

    @Override
    public PasajeroDTO actualizarPasajero(Long id, PasajeroDTO pasajeroDTO) {
        Pasajero p = pasajeroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pasajero no encontrado"));
        p.setNombre(pasajeroDTO.getNombre());
        p.setApellido(pasajeroDTO.getApellido());
        p.setDni(pasajeroDTO.getDni());
        p.setEmail(pasajeroDTO.getEmail());
        return convertirADTO(pasajeroRepository.save(p));
    }

    @Override
    public void eliminarPasajero(Long id) {
        pasajeroRepository.deleteById(id);
    }

    // Métodos privados de conversión
    private PasajeroDTO convertirADTO(Pasajero pasajero) {
        return PasajeroDTO.builder()
                .idPasajero(pasajero.getIdPasajero())
                .nombre(pasajero.getNombre())
                .apellido(pasajero.getApellido())
                .dni(pasajero.getDni())
                .email(pasajero.getEmail())
                .build();
    }

    private Pasajero convertirDesdeDTO(PasajeroDTO dto) {
        return Pasajero.builder()
                .nombre(dto.getNombre())
                .apellido(dto.getApellido())
                .dni(dto.getDni())
                .email(dto.getEmail())
                .build();
    }
}
