package com.example.airport_system.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "destinos")
@Data

public class Destino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDestino;
    
    @Column(nullable = false, length = 100)
    private String ciudad;
    
    @Column(length = 500)
    private String imagen;
    
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    
    @Column(nullable = false)
    private Double precio;
    
    @Column(nullable = false)
    private Boolean disponible = true;
}
