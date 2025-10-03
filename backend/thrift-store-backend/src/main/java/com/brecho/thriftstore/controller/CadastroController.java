package com.brecho.thriftstore.controller; 

import com.brecho.thriftstore.dto.CadastroDTO;
import com.brecho.thriftstore.model.Cliente;
import com.brecho.thriftstore.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder; 
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/cadastro")
public class CadastroController {

    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder; 

    
    @Autowired
    public CadastroController(ClienteRepository clienteRepository, PasswordEncoder passwordEncoder) { // <-- MUDANÇA AQUI
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = passwordEncoder; 
    }

    @PostMapping
    @Transactional
    public ResponseEntity<String> cadastrar(@RequestBody CadastroDTO cadastroDTO) {
        
        Cliente novoCliente = new Cliente();
        novoCliente.setNome(cadastroDTO.getNome());
        novoCliente.setEmail(cadastroDTO.getEmail());
        novoCliente.setCpf(cadastroDTO.getCpf());
        

       
        String senhaCriptografada = passwordEncoder.encode(cadastroDTO.getSenha());
        novoCliente.setSenha(senhaCriptografada);
        

        clienteRepository.save(novoCliente);
        return ResponseEntity.ok("Cadastro realizado com sucesso!");
    }
}