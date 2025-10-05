package com.brecho.thriftstore.service;

import com.brecho.thriftstore.model.Cliente;
import com.brecho.thriftstore.repository.ClienteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ClienteServiceImplTest {

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private ClienteServiceImpl clienteService;

    private Cliente cliente;

    @BeforeEach
    void setUp() {
        cliente = new Cliente();
        cliente.setId(1L);
        cliente.setNome("Teste");
        cliente.setEmail("teste@email.com");
        cliente.setSenha("senha123");
    }

    @Test
    void testCreateCliente_Success() {

        when(passwordEncoder.encode("senha123")).thenReturn("senhaCodificada");

        when(clienteRepository.save(any(Cliente.class))).thenReturn(cliente);

        Cliente clienteSalvo = clienteService.createCliente(cliente);

        assertNotNull(clienteSalvo);
        assertEquals("Teste", clienteSalvo.getNome());

        verify(passwordEncoder, times(1)).encode("senha123");

        verify(clienteRepository, times(1)).save(any(Cliente.class));
    }

    @Test
    void testGetAllClientes() {

        when(clienteRepository.findAll()).thenReturn(java.util.Collections.singletonList(cliente));

        java.util.List<Cliente> clientes = clienteService.getAllClientes();

        assertNotNull(clientes);
        assertEquals(1, clientes.size());
        verify(clienteRepository, times(1)).findAll();
    }

    @Test
    void testGetClienteById_Success() {

        when(clienteRepository.findById(1L)).thenReturn(java.util.Optional.of(cliente));

        Cliente clienteEncontrado = clienteService.getClienteById(1L);

        assertNotNull(clienteEncontrado);

        assertEquals("Teste", clienteEncontrado.getNome());
        verify(clienteRepository, times(1)).findById(1L);
    }

    @Test
    void testUpdateCliente_Success() {

        Cliente clienteAtualizado = new Cliente();
        clienteAtualizado.setNome("Nome Atualizado");
        clienteAtualizado.setEmail("emailnovo@email.com");

        when(clienteRepository.findById(1L)).thenReturn(java.util.Optional.of(cliente));

        when(clienteRepository.save(any(Cliente.class))).thenReturn(clienteAtualizado);

        Cliente resultado = clienteService.updateCliente(1L, clienteAtualizado);

        assertNotNull(resultado);
        assertEquals("Nome Atualizado", resultado.getNome());
        verify(clienteRepository, times(1)).findById(1L);

    }

    @Test
    void testDeleteCliente_Success() {

        clienteService.deleteCliente(1L);

        verify(clienteRepository, times(1)).deleteById(1L);
    }
}