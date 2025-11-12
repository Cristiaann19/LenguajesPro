package com.example.airport_system.Repository;

import com.example.airport_system.Model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservaRepository extends JpaRepository<Reserva,Long> {
}
