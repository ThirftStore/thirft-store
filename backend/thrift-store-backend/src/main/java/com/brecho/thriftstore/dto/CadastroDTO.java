package com.brecho.thriftstore.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CadastroDTO {

    @NotBlank(message = "O campo e-mail é obrigatório")
    @Email(message = "O formato do e-mail é inválido")
    private String email;

    @NotBlank(message = "O campo nome é obrigatório")
    private String nome;

    @NotBlank(message = "O campo CPF é obrigatório")
    @Size(min = 11, max = 14, message = "O CPF deve ter entre 11 e 14 caracteres")
    private String cpf;

    // Endereço
    @NotBlank(message = "O campo rua é obrigatória")
    private String rua;

    @NotBlank(message = "O campo número é obrigatório")
    private String numero;

    private String complemento;

    @NotBlank(message = "O campo setor é obrigatório")
    private String setor;

    @NotBlank(message = "O campo região administrativa é obrigatório")
    private String regAdmin;
    
}
