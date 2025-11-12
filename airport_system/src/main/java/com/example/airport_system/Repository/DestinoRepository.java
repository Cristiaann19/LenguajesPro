package com.example.airport_system.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.airport_system.Model.Destino;
public interface DestinoRepository  extends JpaRepository<Destino,Long>{
    List<Destino> findByDisponibleTrue();
    List<Destino> findByCiudadContainingIgnoreCase(String ciudad);
}
