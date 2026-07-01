package com.example.atividaderh01.service;

import com.example.atividaderh01.dto.ClienteRequestDTO;
import com.example.atividaderh01.dto.ClienteResponseDTO;
import com.example.atividaderh01.model.ClienteModel;
import com.example.atividaderh01.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    public List<ClienteResponseDTO> listarTodos() {

        return repository
                .findAll()
                .stream()
                .map(c -> new ClienteResponseDTO(
                        c.getNome(),
                        c.getEmail(),
                        c.getTelefone()
                ))
                .toList();
    }

    public ClienteModel salvarCliente(ClienteRequestDTO dto) {

        if (repository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Cliente já cadastrado.");
        }

        ClienteModel novoCliente = new ClienteModel();

        novoCliente.setNome(dto.getNome());
        novoCliente.setEmail(dto.getEmail());
        novoCliente.setTelefone(dto.getTelefone());
        novoCliente.setCpf(dto.getCpf());

        return repository.save(novoCliente);
    }
}
