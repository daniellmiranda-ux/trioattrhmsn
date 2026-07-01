package com.example.atividaderh01.service;

import com.example.atividaderh01.dto.FuncionarioRequestDTO;
import com.example.atividaderh01.dto.FuncionarioResponseDTO;
import com.example.atividaderh01.model.FuncionarioModel;
import com.example.atividaderh01.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository repository;

    public List<FuncionarioResponseDTO> listarTodos() {

        return repository
                .findAll()
                .stream()
                .map(f -> new FuncionarioResponseDTO(
                        f.getNome(),
                        f.getTelefone(),
                        f.getEmail(),
                        f.getCargo(),
                        f.getSetor()
                ))
                .toList();
    }

    public FuncionarioModel salvarFuncionario(FuncionarioRequestDTO dto) {

        if (repository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Funcionário já cadastrado.");
        }

        FuncionarioModel novoFuncionario = new FuncionarioModel();

        novoFuncionario.setNome(dto.getNome());
        novoFuncionario.setTelefone(dto.getTelefone());
        novoFuncionario.setEmail(dto.getEmail());
        novoFuncionario.setCargo(dto.getCargo());
        novoFuncionario.setSetor(dto.getSetor());

        return repository.save(novoFuncionario);
    }
}
