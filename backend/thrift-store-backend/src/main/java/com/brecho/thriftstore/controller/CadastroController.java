package com.brecho.thriftstore.controller;


import com.brecho.thriftstore.dto.CadastroDTO;
import com.brecho.thriftstore.model.Cliente;
import com.brecho.thriftstore.model.Endereco;
import com.brecho.thriftstore.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/cadastro")
public class CadastroController {

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<String> realizarCadastro(@RequestBody @Valid CadastroDTO dados) {
        
        Endereco endereco = new Endereco();
        endereco.setRua(dados.getRua());
        endereco.setNumero(dados.getNumero());
        endereco.setComplemento(dados.getComplemento());
        endereco.setSetor(dados.getSetor());
        endereco.setRegAdmin(dados.getRegAdmin());

        Cliente cliente = new Cliente();
        cliente.setNome(dados.getNome());
        cliente.setEmail(dados.getEmail());
        cliente.setCpf(dados.getCpf());
        
        cliente.setEndereco(endereco);

        clienteRepository.save(cliente);

        return ResponseEntity.status(HttpStatus.CREATED).body("Cadastro realizado com sucesso!");
    }
}