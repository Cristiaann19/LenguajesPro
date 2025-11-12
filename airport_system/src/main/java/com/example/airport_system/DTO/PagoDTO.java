package com.example.airport_system.DTO;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PagoDTO {
    private Long idPago;
    private Long idReserva;
    private Double monto;
    private String metodoPago;
    private LocalDateTime fechaPago;
}
