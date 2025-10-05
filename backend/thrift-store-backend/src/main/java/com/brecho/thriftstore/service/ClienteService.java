package com.brecho.thriftstore.service;

import com.brecho.thriftstore.model.Cliente;
import java.util.List;

public interface ClienteService {
    Cliente createCliente(Cliente cliente);
    List<Cliente> getAllClientes();
    Cliente getClienteById(Long id);
    Cliente updateCliente(Long id, Cliente clienteDetails);
    void deleteCliente(Long id);
}