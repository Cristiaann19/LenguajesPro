package com.example.airport_system.Service;

import com.example.airport_system.DTO.*;
import com.example.airport_system.Model.Usuario;
import com.example.airport_system.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponse registrar(RegistroRequest request) {
        // Verificar si el email ya existe
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        // Crear nuevo usuario
        Usuario usuario = Usuario.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nombreCompleto(request.getNombreCompleto())
                .rol("USER")
                .build();

        Usuario guardado = usuarioRepository.save(usuario);

        // Convertir a DTO
        UsuarioDTO usuarioDTO = UsuarioDTO.builder()
                .idUsuario(guardado.getIdUsuario())
                .email(guardado.getEmail())
                .nombreCompleto(guardado.getNombreCompleto())
                .rol(guardado.getRol())
                .build();

        return new AuthResponse(
                "token-jwt-aqui", // Aquí implementarías JWT
                usuarioDTO,
                "Usuario registrado exitosamente"
        );
    }

    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

        // Verificar contraseña
        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        if (!usuario.getActivo()) {
            throw new RuntimeException("Usuario desactivado");
        }

        // Convertir a DTO
        UsuarioDTO usuarioDTO = UsuarioDTO.builder()
                .idUsuario(usuario.getIdUsuario())
                .email(usuario.getEmail())
                .nombreCompleto(usuario.getNombreCompleto())
                .rol(usuario.getRol())
                .build();

        return new AuthResponse(
                "token-jwt-aqui", // Aquí implementarías JWT
                usuarioDTO,
                "Login exitoso"
        );
    }
}