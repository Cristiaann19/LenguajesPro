package com.example.airport_system.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PasajeroDTO {
    private Long idPasajero;
    private String nombre;
    private String apellido;
    private String dni;
    private String email;
}
