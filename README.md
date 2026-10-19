# 🏭 Metaindústria - Sistema de Monitoramento de EPIs (Sprint 4 - Entrega Final)

Este projeto representa a entrega final e integração completa da **Sprint 4** entre o **Backend Spring Boot (REST API)** e o **Frontend Mobile (React Native com Expo)**, aplicando inteligência de Visão Computacional (YOLOv8) para monitoramento de conformidade de Equipamentos de Proteção Individual (EPIs) na Metaindústria.

---

## 👥 Integrantes do Grupo
- **Juliana Barbosa Sandes** - RM: 555605
- **Clara Jullia Kondrasovas Costa e Silva** - RM: 556064
- **Arthur Macedo Gouvea** - RM: 556499
- **Lucas do Carmo Cima** - RM: 564964
- **Arthur Ederson de Oliveira Silva** - RM: 557079

---

## 🔗 Repositório (Monorepo)
* **Link:** [https://github.com/kondrasz/SPRINT3-AdvancedProgrammingMobileDev](https://github.com/kondrasz/SPRINT3-AdvancedProgrammingMobileDev)

---

## 📌 Descrição do Projeto
O aplicativo mobile simula o recebimento de logs de flagrantes do algoritmo de visão computacional YOLOv8 e envia requisições em tempo real para a API REST. A aplicação **não utiliza dados mockados no fluxo principal**; ela persiste, lista e consulta registros reais no banco de dados H2 file.

---

## 🛠️ Como Subir o Backend (Spring Boot)

1. Entre na pasta do backend:
   ```bash
   cd SPRINT1-AdvancedProgrammingMobileDev
   ```
2. Certifique-se de que possui o **Java 17** ou superior e o Maven instalados.
3. Execute o servidor utilizando o Wrapper do Maven:
   * **Linux/macOS:**
     ```bash
     ./mvnw spring-boot:run
     ```
   * **Windows:**
     ```bash
     mvnw.cmd spring-boot:run
     ```
4. O backend estará rodando em: `http://localhost:8080`
5. Console do Banco H2 (File): `http://localhost:8080/h2-console`
   * **JDBC URL:** `jdbc:h2:file:./data/consultas`
   * **User Name:** `sa`
   * **Password:** *(em branco)*

---

## 📱 Como Subir o Frontend (React Native Expo)

1. Em um novo terminal, entre na pasta do frontend:
   ```bash
   cd SPRINT2-AdvancedProgrammingMobileDev
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o projeto Expo:
   ```bash
   npm run web
   ```
   *(Ou execute `npx expo start` para abrir no celular físico / emulador Android/iOS)*

---

## ⚙️ Configuração da BASE_URL (`src/services/api.ts`)

A comunicação com o backend é feita via **Axios**. A URL base da API deve ser ajustada no arquivo `src/services/api.ts` dependendo do seu ambiente:

* **Expo Web / iOS Simulator:** `http://localhost:8080`
* **Android Emulator:** `http://10.0.2.2:8080`
* **Dispositivo Físico (Expo Go):** Usar o IP local da sua máquina (Exemplo: `http://192.168.1.26:8080`)

---

## 🛣️ Endpoints da API

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **GET** | `/deteccoes` | Retorna a lista com todos os logs de EPIs |
| **GET** | `/deteccoes/{id}` | Retorna os detalhes de um flagrante pelo ID |
| **POST** | `/deteccoes` | Cria um novo registro de detecção de EPI |
| **PUT** | `/deteccoes/{id}` | Atualiza uma detecção existente |
| **DELETE** | `/deteccoes/{id}` | Remove um registro pelo ID |

### Exemplo de JSON retornado:
```json
{
  "id": 1,
  "equipamento": "Óculos de Proteção",
  "emUso": true,
  "setor": "Setor Automatizado Sul",
  "dataHora": "2026-09-02T10:30:00"
}
```

---

## 🧪 Roteiro de Teste de Integração e Queda do Servidor

Para avaliar a resiliência do sistema e a ausência de dados falsos (mocks), siga este roteiro:

1. **Testar Funcionalidade (App integrado à API):**
   * Com backend e frontend rodando, abra o app. O `useEffect` chamará `listarDeteccoes()` e renderizará os cards vindos da API.
   * Clique em **"+ Novo Log"**, escolha uma simulação e envie. O app fará um `POST` real e a lista será atualizada.
2. **Testar Queda do Backend (Prova de ausência de mocks):**
   * Vá ao terminal onde o Spring Boot está rodando e pressione `Ctrl + C` para derrubar a API.
   * No aplicativo, pressione o botão de **"Tentar Novamente"** ou recarregue a tela.
   * **Resultado esperado:** O aplicativo captura a falha de conexão e altera a interface, exibindo um card vermelho informando que o servidor está indisponível. Nenhum dado fantasma (mock) é carregado na tela.

---

## 🎥 Vídeo Demonstrativo
Abaixo está o link para o vídeo (Não Listado) demonstrando o sistema integrado, a persistência no backend, e o teste prático de queda do servidor comprovando a exibição do erro.

▶️ **Link do YouTube:** (fazer o video e colocar aqui)
