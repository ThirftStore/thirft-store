package com.brecho.thriftstore.repository;

import com.brecho.thriftstore.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}