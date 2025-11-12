package com.example.airport_system.Service;

import com.example.airport_system.Model.Destino;
import com.example.airport_system.Repository.DestinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DestinoServiceImpl implements DestinoService {
    
    @Autowired
    private DestinoRepository destinoRepository;
    
    @Override
    @Transactional(readOnly = true)
    public List<Destino> obtenerTodos() {
        return destinoRepository.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Destino> obtenerDisponibles() {
        return destinoRepository.findByDisponibleTrue();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<Destino> obtenerPorId(Long id) {
        return destinoRepository.findById(id);
    }
    
    @Override
    public Destino guardar(Destino destino) {
        return destinoRepository.save(destino);
    }
    
    @Override
    public void eliminar(Long id) {
        destinoRepository.deleteById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Destino> buscarPorCiudad(String ciudad) {
        return destinoRepository.findByCiudadContainingIgnoreCase(ciudad);
    }
}
