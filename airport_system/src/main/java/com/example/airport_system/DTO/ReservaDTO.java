package com.example.airport_system.DTO;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservaDTO {
    private Long idReserva;
    private Long idVuelo;
    private Long idPasajero;
    private LocalDateTime fechaReserva;
    private String asiento;
    private String estado;
}
