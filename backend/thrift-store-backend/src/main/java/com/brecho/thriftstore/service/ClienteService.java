package com.brecho.thriftstore.service;

import com.brecho.thriftstore.model.Cliente;
import java.util.List;
import java.util.Optional;

public interface ClienteService {
    Cliente createCliente(Cliente cliente);
    List<Cliente> getAllClientes();
    Optional<Cliente> getClienteById(Long id);
    Cliente updateCliente(Long id, Cliente clienteDetails);
    void deleteCliente(Long id);
}