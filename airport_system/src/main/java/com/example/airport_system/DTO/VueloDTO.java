package com.example.airport_system.DTO;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VueloDTO {
    private Long idVuelo;
    private String codigoVuelo;
    private String origen;
    private String destino;
    private LocalDate fechaSalida;
    private LocalTime horaSalida;
    private Double precio;
    private String estado;
}
