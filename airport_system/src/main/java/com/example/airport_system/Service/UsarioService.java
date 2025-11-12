package com.example.airport_system.Service;

import com.example.airport_system.Model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsarioService extends JpaRepository<Usuario,Long> {
}
