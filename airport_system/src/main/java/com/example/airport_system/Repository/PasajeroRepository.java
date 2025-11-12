package com.example.airport_system.Repository;

import com.example.airport_system.Model.Pasajero;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasajeroRepository extends JpaRepository<Pasajero,Long> {
}
