package com.example.airport_system.Service;

import com.example.airport_system.Model.Destino;
import java.util.List;
import java.util.Optional;

public interface DestinoService {
    List<Destino> obtenerTodos();
    
    List<Destino> obtenerDisponibles();
    
    Optional<Destino> obtenerPorId(Long id);
    
    Destino guardar(Destino destino);
    
    void eliminar(Long id);
    
    List<Destino> buscarPorCiudad(String ciudad);
}
