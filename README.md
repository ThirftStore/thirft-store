# 🪷 Thirft Store - Brechó Florescer 

Uma aplicação de loja virtual com foco em roupas usadas e slow fashion. O projeto busca auxiliar na redução dos "desertos de roupas" e no aumento da economia circular no mercado de vestuário. 
Este é um MVP full-stack, demonstrando proficiência em arquitetura moderna e desenvolvimento ágil. 

---

## 🚀  Começando
Ao seguir as instruções, você terá uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste. 

### 🌐 Pré-requisitos
Você precisa das seguintes ferramentas instaladas: 

- [ ] **Docker**: para orquestração de containers;
- [ ] **Java 21 e Maven**: caso deseje rodar o backend localmente fora do Docker.
- [ ] **LiveServer**: extensão do VSCode, caso deseje rodar fora do Docker.

### 🔧 Instalação
Série de passo-a-passo abaixo inicia toda a sua infraestrutura:

> 1. Clona o repositório:
> ``git clone https://github.com/ThirftStore/thirft-store ``
>  2. Mude de diretório:  ``cd thirft-store``.
>  3. No diretório raiz, execute o Docker Compose para construir as imagens e iniciar os três serviços:  ``docker compose up --build``.
 
 Depois de alguns minutos, a aplicação estará pronta!

 **Acessando a Aplicação:** 

 | Serviço | Endereço |
| :--- | :--- |
| Frontend | `http://localhost:3000`|
| Backend | `http://localhost:8080` |
| Banco de Dados | Porta `5432` |
> 💡 observação:
> o endereço do frontend pode variar dependendo de como você executa o projeto, se for com o Docker, será a porta 3000, mas se for pelo LiveServer do VS Code, poderá ser: ``http://127.0.0.1:5500/frontend/modules/checkout/checkout.html``.


 ## ⚙️ Teste Funcionais 
 A aplicação contém testes unitários na camada Java. Para testar o fluxo de compra da aplicação: 

 > 1. Acesse o **Catálogo** em ``http://localhost:3000``.
 > 2. Clique no botão **Carrinho** para acessar os produtos adicionados (os dados estão mockados).
 > 3. Navegue para verificar os itens e o total.
 > 4. Clique em **Finalizar a Compra**, preencha os dados no checkout e clique em **Finalizar Compra**.

 Se o console do navegador mostrar o JSON de ``orderPayload`` e o console do backend Java exibir a persistência do novo cliente e do endereço, signfica que o fluxo está correto ☑️ .

 ## 🛠️ Construído com 
 **BACKEND**
- [ ] Java 21
- [ ] Spring Boot
- [ ] Spring Data JPA (ORM)
- [ ] PostgreSQL

**FRONTEND**
- [ ] HTML
- [ ] CSS
- [ ] JavaScript


**INFRAESTRUTURA**
- [ ] Docker Compose 
- [ ] Maven

## 🖇️ Estrutura do Projeto 

O projeto segue uma arquitetura robusta no backend e módulos bem definidos no frontend: 

- **`vscode/`**: armazenna arquivos de configuração do VS Code (como JSON).
- **`backend/`**: Projeto Java/Spring Boot.
- **`backend/thrift-store-backend`**: pasta raíz com o código fonte e arquivos de build (como o ``pom.xml``)`.
- **`backend/thrift-store-backend/mvn`**: contém os wrappers do Maven, garantindo sua execução em qualquer ambiente.
- **`backend/thrift-store-backend/src/main/java/config/`**: contém classes de configuração do Spring.
- **`backend/thrift-store-backend/src/main/java/controller/`**: recebe requisições HTTP  e define os endpoints (ex.: ``/api/cadastro``).  
- **`backend/thrift-store-backend/src/main/java/dto/`**: representa estrutura de dados dque entra e sai da API, separada das entidades de domínio
- **`backend/thrift-store-backend/src/main/java/model/`**: contém as entidades de domínio.
- **`backend/thrift-store-backend/src/main/java/repository/`**: contém as interfaces de acesso aos dados.
- **`backend/thrift-store-backend/src/main/resources/`**: contém arquivos de recursos e propriedades.
- **`backend/thrift-store-backend/src/main/test/`**: contém o código-fonte dos testes automatizados.
- **`Dockerfile.backend`**: define como o docker deve construir a imagem da API.
- **`backend/thrift-store-backend/mvnw/`**: script wrapper do Maven para Linux/MacOs.
- **`backend/thrift-store-backend/mvnw.cmd/`**: script wrapper do Maven para Windows.
- **`frontend/`**: contém toda da aplicação HTML, CSS e JavaScript.
- **`frontend/assets/`**: imagens estáticas
- **`frontend/modules/`**: páginas principais da loja (``cart``, ``checkout``, ``home``).
- **`frontend/shared/`**: estilos reutilizáveis
- **`docker-compose.yml/`**: arquivo de orquestração Docker.
- **`LICENSE`**: arquivo de licença do projeto. 

## 🤝 Colaborando 
Fique à vontade para contribuir com ideias, reportar bugs ou enviar melhorias! Se quiser colaborar com o projeto, entre em contato com as colaboradoras ou envia um _Pull Resquest_ para a branch ``develop`` ou ``bugfix``.

## 📄 Licença 
Este projeto está sob a licença MIT - veja o arquivo **[LICENSE](./License)** para detalhes. 

---
✨ com ❤️ por **[Ana Clara](https://github.com/anaacllara)** e **[Sabrina](https://github.com/Sabrina-Abreu)**
