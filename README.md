# 🏭 Metaindústria - Sistema de Monitoramento de EPIs (Sprint 3)

Este projeto representa a integração completa da **Sprint 3** entre o **Backend Spring Boot (REST API)** e o **Frontend Mobile (React Native com Expo)**, aplicando inteligência de Visão Computacional (YOLOv8) para monitoramento de conformidade de Equipamentos de Proteção Individual (EPIs) na Metaindústria.

---

## 👥 Integrantes do Grupo
- **Juliana Barbosa Sandes** - RM: 555605
- **Clara Jullia Kondrasovas Costa e Silva** - RM: 556064
- **Arthur Macedo Gouvea** - RM: 556499
- **Lucas do Carmo Cima** - RM: 564964
- **Arthur Ederson de Oliveira Silva** - RM: 557079

---

## 📌 Descrição do Projeto
O aplicativo mobile simula o recebimento de logs de flagrantes do algoritmo de visão computacional YOLOv8 e envia requisições em tempo real para a API REST. A aplicação deixou de utilizar dados mockados e agora persiste, lista e consulta registros reais no banco de dados H2 file.

---

## 🛠️ Como Subir o Backend (Spring Boot)

1. Entre na pasta do backend:
   ```bash
   cd SPRINT1-AdvancedProgrammingMobileDev
   2. Certifique-se de que possui o **Java 17** ou superior instalado.

3. Execute o servidor utilizando o Wrapper do Maven:
   * **Linux/macOS:**
     ./mvnw spring-boot:run
   * **Windows:**
     mvnw.cmd spring-boot:run
4. O backend estará rodando em: `http://localhost:8080`

5. Console do Banco H2 (File): `http://localhost:8080/h2-console`
   * **JDBC URL:** `jdbc:h2:file:./data/consultas`
   * **User Name:** `sa`
   * **Password:** *(em branco)*

## 📱 Como Subir o Frontend (React Native Expo)

1. Entre na pasta do frontend:
cd SPRINT2-AdvancedProgrammingMobileDev
2. Instale as dependências (com o Axios gerenciado pelo Expo):
   npm install
npx expo install axios
3. Inicie o projeto Expo:
   npm run web
   *(Ou execute `npx expo start` para abrir no celular/emulador)*

---

## ⚙️ Configuração da BASE_URL (`src/services/api.ts`)

A URL base da API é configurada centralizadamente na camada de serviços em `src/services/api.ts`:

* **Expo Web / iOS Simulator:** `http://localhost:8080`
* **Android Emulator:** `http://10.0.2.2:8080`
* **Dispositivo Físico (Expo Go):** Usar o IP local da sua máquina (Exemplo: `http://192.168.1.100:8080`)

---

## 📂 Camada de Serviços (`src/services/`)

A comunicação com o backend é isolada da interface visual através de funções assíncronas utilizando **Axios**:

* **`src/services/api.ts`**: Configura a instância base do Axios (`baseURL`, `timeout: 10000ms`, `headers: application/json`).
* **`src/services/deteccaoService.ts`**:
  * `listarDeteccoes()`: Executa `GET /deteccoes` para buscar a lista de registros.
  * `buscarDeteccaoPorId(id)`: Executa `GET /deteccoes/{id}` para consultar detalhes da ocorrência.
  * `criarDeteccao(deteccao)`: Executa `POST /deteccoes` enviando um novo payload com `Omit<DeteccaoEpi, "id">`.

## 🛣️ Endpoints da API

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **GET** | `/deteccoes` | Retorna a lista com todos os logs de EPIs |
| **GET** | `/deteccoes/{id}` | Retorna os detalhes de um flagrante pelo ID |
| **POST** | `/deteccoes` | Cria um novo registro de detecção de EPI |
| **PUT** | `/deteccoes/{id}` | Atualiza uma detecção existente |
| **DELETE** | `/deteccoes/{id}` | Remove um registro pelo ID |

### Exemplo de JSON para `POST /deteccoes`:
{
  "equipamento": "Capacete de Segurança",
  "emUso": false,
  "setor": "Setor de Carga Sul",
  "dataHora": "2026-09-16T18:30:00"
}
---

## 🧪 Como Testar a Integração de Ponta a Ponta

1. **Validação via REST Client (Postman/Insomnia/Navegador):**
   * Acesse `http://localhost:8080/deteccoes` no navegador para verificar se a API retorna JSON.
2. **Listagem com `useEffect`:**
   * Abra o app no navegador (`http://localhost:8081`). O `useEffect` chamará `listarDeteccoes()` e renderizará os cards vindos da API.
3. **Cadastro com `POST`:**
   * Clique em **"+ Novo Log"**, escolha uma simulação do YOLOv8 e clique em enviar. O app enviará o `POST` para o backend e atualizará a lista.
4. **Consulta com `GET` por ID:**
   * Clique sobre qualquer card da lista. O app buscará os dados específicos diretamente do endpoint `/deteccoes/{id}`.

---

## 🛡️ Tratamento de Erro (Backend Indisponível)

Se o backend Spring Boot for interrompido ou estiver fora do ar:
1. As chamadas assíncronas dentro do bloco `try/catch/finally` falharão.
2. O app captura a exceção e altera o estado do hook `erro`.
3. A interface substitui a lista por um **card de alerta informativo** avisando que a API está fora do ar, além de disponibilizar um botão **"Tentar Novamente"** para recarregar sem travar a aplicação.
