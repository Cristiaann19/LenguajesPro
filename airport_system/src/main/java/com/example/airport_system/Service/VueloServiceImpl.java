package com.example.airport_system.Service;

import com.example.airport_system.DTO.VueloDTO;
import com.example.airport_system.Model.Vuelo;
import com.example.airport_system.Repository.VueloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VueloServiceImpl implements VueloService{
    @Autowired
    private VueloRepository vueloRepository;

    @Override
    public List<VueloDTO> listarVuelos() {
        return vueloRepository.findAll()
                .stream()
                .map(this::convertirAVueloDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<VueloDTO> obtenerVueloPorId(Long id) {
        return vueloRepository.findById(id)
                .map(this::convertirAVueloDTO);
    }

    @Override
    public VueloDTO guardarVuelo(VueloDTO vueloDTO) {
        Vuelo vuelo = convertirDesdeDTO(vueloDTO);
        Vuelo guardado = vueloRepository.save(vuelo);
        return convertirAVueloDTO(guardado);
    }

    @Override
    public VueloDTO actualizarVuelo(Long id, VueloDTO vueloDTO) {
        Vuelo v = vueloRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vuelo no encontrado"));

        v.setCodigoVuelo(vueloDTO.getCodigoVuelo());
        v.setOrigen(vueloDTO.getOrigen());
        v.setDestino(vueloDTO.getDestino());
        v.setFechaSalida(vueloDTO.getFechaSalida());
        v.setHoraSalida(vueloDTO.getHoraSalida());
        v.setPrecio(vueloDTO.getPrecio());
        v.setEstado(vueloDTO.getEstado());

        Vuelo actualizado = vueloRepository.save(v);
        return convertirAVueloDTO(actualizado);
    }

    @Override
    public void eliminarVuelo(Long id) {
        vueloRepository.deleteById(id);
    }

    // =======================
    // MÉTODOS DE CONVERSIÓN
    // =======================
    private VueloDTO convertirAVueloDTO(Vuelo vuelo) {
        return VueloDTO.builder()
                .idVuelo(vuelo.getIdVuelo())
                .codigoVuelo(vuelo.getCodigoVuelo())
                .origen(vuelo.getOrigen())
                .destino(vuelo.getDestino())
                .fechaSalida(vuelo.getFechaSalida())
                .horaSalida(vuelo.getHoraSalida())
                .precio(vuelo.getPrecio())
                .estado(vuelo.getEstado())
                .build();
    }

    private Vuelo convertirDesdeDTO(VueloDTO dto) {
        return Vuelo.builder()
                .codigoVuelo(dto.getCodigoVuelo())
                .origen(dto.getOrigen())
                .destino(dto.getDestino())
                .fechaSalida(dto.getFechaSalida())
                .horaSalida(dto.getHoraSalida())
                .precio(dto.getPrecio())
                .estado(dto.getEstado())
                .build();
    }




}
