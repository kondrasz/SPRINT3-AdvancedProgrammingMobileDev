# API de Monitoramento de EPIs - Desafio Metaindústria

Esta API REST foi desenvolvida como o componente de backend para o projeto do Challenge. O objetivo principal do sistema é registrar e gerenciar o histórico de detecções de Equipamentos de Proteção Individual (EPIs) realizadas em tempo real por algoritmos de Visão Computacional (YOLOv8). 

Com foco na segurança do trabalho dentro do cenário da Metaindústria, a API atua como um cérebro centralizador, armazenando "onde e quando" uma infração ou uso correto de segurança foi detectado no chão de fábrica, permitindo auditorias e a criação de dashboards de conformidade.

---

## 🛠️ Arquitetura do Projeto

O sistema foi estruturado seguindo rigorosamente o padrão de Arquitetura em Camadas, garantindo baixo acoplamento, alta coesão e facilidade de manutenção.

Estrutura de pacotes sob a raiz src/main/java/com/sprint/challenge/:
- controller: Camada de exposição dos endpoints HTTP REST.
- service: Camada responsável pelas regras de negócio e validações.
- repository: Camada de acesso ao banco de dados (JPA).
- model: Camada que representa as entidades e tabelas do banco.
- ChallengeApplication.java: Classe principal que inicializa o Spring Boot.

---

## 📦 Entidade do Domínio: Deteccao

A entidade principal mapeada para o banco de dados representa uma ocorrência industrial capturada pelas câmeras de monitoramento:

* id (Long): Identificador único autogerado pelo banco de dados.
* equipamento (String): O tipo de EPI monitorado (Ex: Capacete, Colete, Luvas).
* emUso (Boolean): Define o status de segurança (true se o funcionário estiver usando o EPI corretamente; false se for flagrada uma infração).
* setor (String): Área industrial onde a câmera realizou o flagrante (Ex: Almoxarifado, Linha de Montagem B).
* dataHora (LocalDateTime): Registro de data e horário exatos em que a detecção ocorreu.

---

## 🚀 Endpoints Disponíveis (CRUD Completo)

A API expõe as seguintes rotas a partir do endereço base http://localhost:8080/deteccoes:

- POST /deteccoes : Registra uma nova detecção do YOLO.
- GET /deteccoes : Lista todos os registros salvos.
- GET /deteccoes/{id} : Busca um registro específico pelo ID.
- PUT /deteccoes/{id} : Atualiza uma detecção existente.
- DELETE /deteccoes/{id} : Remove permanentemente um registro.

### Exemplo de JSON para POST / PUT:
{
  "equipamento": "Capacete",
  "emUso": false,
  "setor": "Setor de Carga Sul",
  "dataHora": "2026-05-17T14:30:00"
}

---

## 💾 Persistência de Dados (Banco H2)

Para cumprir as diretrizes da Sprint, o banco de dados H2 foi configurado para rodar em modo File (arquivo local). Isso garante que, mesmo se a aplicação Spring Boot for interrompida ou reiniciada, os dados salvos permanecerão guardados de forma segura.

* Arquivo do banco: Localizado na pasta ./data/ na raiz do projeto.
* H2 Console: Pode ser acessado pelo navegador em http://localhost:8080/h2-console com o projeto em execução.
    * JDBC URL: jdbc:h2:file:./data/epi_db
    * User Name: sa
    * Password: (em branco)

---

## 🏃 Como Rodar o Projeto

1. Certifique-se de ter o Java 17 e o Maven configurados no seu ambiente.
2. Abra o projeto no VS Code.
3. Certifique-se de que a extensão Extension Pack for Java está instalada.
4. Abra o arquivo ChallengeApplication.java e clique na opção Run logo acima do método main, ou execute o comando "mvn spring-boot:run" no terminal na raiz do projeto.
5. A aplicação iniciará na porta padrão 8080. Abra o seu cliente HTTP de preferência (Postman para testar os endpoints.
