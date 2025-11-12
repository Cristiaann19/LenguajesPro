package com.example.airport_system.Repository;

import com.example.airport_system.Model.Vuelo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VueloRepository extends JpaRepository<Vuelo,Long> {
}
