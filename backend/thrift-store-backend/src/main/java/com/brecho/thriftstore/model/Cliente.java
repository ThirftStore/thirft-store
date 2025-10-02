package com.brecho.thriftstore.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "clientes")
@Getter
@Setter
public class Cliente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;   
    private String cpf;

    @OneToOne(cascade = CascadeType.ALL) 

    @JoinColumn(name = "endereco_id", referencedColumnName = "id")
    private Endereco endereco;
}
