package com.brecho.thriftstore.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "enderecos")
@Getter
@Setter
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rua;
    private String numero; 
    private String complemento;
    private String setor;

    @Column(name = "regiao_administrativa")
    private String regAdmin;
    
}
