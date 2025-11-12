package com.example.airport_system.Repository;

import com.example.airport_system.Model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolRepository extends JpaRepository<Rol,Long> {
    Rol findByNombre(String nombre);
}
