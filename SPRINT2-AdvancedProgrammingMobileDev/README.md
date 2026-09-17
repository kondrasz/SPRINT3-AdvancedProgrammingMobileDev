# App Mobile - Monitoramento Industrial de EPIs (YOLOv8)

Este aplicativo mobile foi desenvolvido em React Native com Expo e TypeScript para atuar como a interface de gerenciamento de conformidade de segurança da Metaindústria. O sistema foi estruturado para funcionar como o frontend que consumirá a API de detecções de Equipamentos de Proteção Individual (EPIs).

---

## 🛠️ Arquitetura e Estrutura do Projeto

O projeto segue rigorosamente os padrões de componentização, separação de responsabilidades e tipagem forte discutidos em aula:
```text
src/
├── components/
│   ├── DeteccaoCard.tsx    -> Componente isolado do Card (Filho) com Props e Callbacks
│   └── index.ts            -> Barrel export (Centralizador de exportações)
├── data/
│   └── mockData.ts         -> Array com os dados iniciais simulados
├── screens/
│   ├── CadastroScreen.tsx  -> Tela de simulação de novos disparos do YOLOv8
│   ├── DetalheScreen.tsx   -> Tela de metadados da ocorrência selecionada por ID
│   └── ListagemScreen.tsx  -> Tela principal com o mapeamento dos logs de segurança
└── types/
    └── index.ts            -> Modelo global 'DeteccaoEpi' (Contrato com o Backend)
```
---

## 📦 Modelo de Dados e Mock

Os dados estão sendo simulados através de um estado local baseado em um array tipado inicial. O contrato de dados reflete fielmente o domínio do backend:

- id: Identificador exclusivo gerado via timestamp na criação.
- equipamento: O tipo de EPI monitorado pela Inteligência Artificial.
- emUso: Define o status (true para Uso Seguro; false para Alerta de Infração).
- setor: Área industrial onde o frame foi capturado.
- dataHora: Registro de data e horário do flagrante.

---

## 🏃 Como Rodar o Aplicativo

1. Instale as dependências do projeto executando o comando na raiz da pasta:
   ```text
   npm install

3. Inicialize o servidor de desenvolvimento focado na versão Web através do script configurado no projeto:
   ```text
   npm run web

5. O navegador abrirá automaticamente em http://localhost:8081. 

6. Para uma experiência mobile adequada no ecossistema web, pressione F12 no seu navegador, ative a emulação de dispositivos móveis (Ctrl + Shift + M) e selecione um frame de dispositivo móvel (como Moto G4 ou iPhone).
