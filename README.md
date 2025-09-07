# Lab Catalog Microservice

Microserviço de catálogo para laboratório IoT construído com Next.js, MongoDB e Prisma.

## 🎯 Objetivo

Este serviço fornece um conjunto de tabelas que funcionam como "catálogo mestre" de um laboratório, permitindo cadastrar e consultar entidades que depois serão usadas pelo "lab-manager" para criar instâncias reais (culturas, protocolos aplicados, etc).

## 🚀 Características

- **CRUD Completo**: Operações Create, Read, Update e Delete para todas as entidades
- **Rastreabilidade**: Campos `createdAt` e `updatedAt` automáticos
- **API REST**: Endpoints padronizados para todas as operações
- **Validação**: Validação de dados com Zod
- **MongoDB**: Banco de dados NoSQL com Prisma ORM
- **TypeScript**: Tipagem estática completa

## 📊 Entidades do Catálogo

### 1. Strains (Cepas)
- Cepas de fungos/bactérias
- Campos: nome, espécie, descrição, origem, características

### 2. Culture Types (Tipos de Cultura)
- Tipos de cultura
- Campos: nome, descrição, meio, temperatura, umidade, pH

### 3. Grow Parameters (Parâmetros de Crescimento)
- Parâmetros de crescimento
- Campos: nome, tipo, unidade, valores min/max/ótimo

### 4. Substrates (Substratos)
- Substratos para cultivo
- Campos: nome, tipo, composição, pH, nutrientes

### 5. Consumable Items (Itens Consumíveis)
- Itens consumíveis do laboratório
- Campos: nome, categoria, unidade, fornecedor, número de catálogo

### 6. Durable Items (Itens Duráveis)
- Itens duráveis do laboratório
- Campos: nome, categoria, marca, modelo, número de série, localização

### 7. Protocols (Protocolos/Ações)
- Protocolos e ações do laboratório
- Campos: nome, tipo, passos, duração, temperatura, equipamentos, materiais

## 🛠️ Tecnologias

- **Next.js 15**: Framework React com App Router
- **SQLite**: Banco de dados local para desenvolvimento
- **Prisma**: ORM para TypeScript
- **Zod**: Validação de schemas
- **Tailwind CSS**: Framework CSS
- **TypeScript**: Linguagem de programação
- **Swagger/OpenAPI**: Documentação da API
- **Swagger UI**: Interface interativa para testes

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd lab-utils-nextjs
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
```bash
# Crie um arquivo .env na raiz do projeto
echo 'DATABASE_URL="file:./dev.db"' > .env
```

4. Execute as migrations:
```bash
npx prisma db push
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🔌 API Endpoints

### Strains
- `GET /api/strains` - Listar todas as cepas
- `GET /api/strains/[id]` - Buscar cepa por ID
- `POST /api/strains` - Criar nova cepa
- `PUT /api/strains/[id]` - Atualizar cepa
- `DELETE /api/strains/[id]` - Deletar cepa

### Culture Types
- `GET /api/culture-types` - Listar todos os tipos de cultura
- `GET /api/culture-types/[id]` - Buscar tipo de cultura por ID
- `POST /api/culture-types` - Criar novo tipo de cultura
- `PUT /api/culture-types/[id]` - Atualizar tipo de cultura
- `DELETE /api/culture-types/[id]` - Deletar tipo de cultura

### Grow Parameters
- `GET /api/grow-parameters` - Listar todos os parâmetros
- `GET /api/grow-parameters/[id]` - Buscar parâmetro por ID
- `POST /api/grow-parameters` - Criar novo parâmetro
- `PUT /api/grow-parameters/[id]` - Atualizar parâmetro
- `DELETE /api/grow-parameters/[id]` - Deletar parâmetro

### Substrates
- `GET /api/substrates` - Listar todos os substratos
- `GET /api/substrates/[id]` - Buscar substrato por ID
- `POST /api/substrates` - Criar novo substrato
- `PUT /api/substrates/[id]` - Atualizar substrato
- `DELETE /api/substrates/[id]` - Deletar substrato

### Consumable Items
- `GET /api/consumable-items` - Listar todos os itens consumíveis
- `GET /api/consumable-items/[id]` - Buscar item por ID
- `POST /api/consumable-items` - Criar novo item
- `PUT /api/consumable-items/[id]` - Atualizar item
- `DELETE /api/consumable-items/[id]` - Deletar item

### Durable Items
- `GET /api/durable-items` - Listar todos os itens duráveis
- `GET /api/durable-items/[id]` - Buscar item por ID
- `POST /api/durable-items` - Criar novo item
- `PUT /api/durable-items/[id]` - Atualizar item
- `DELETE /api/durable-items/[id]` - Deletar item

### Protocols
- `GET /api/protocols` - Listar todos os protocolos
- `GET /api/protocols/[id]` - Buscar protocolo por ID
- `POST /api/protocols` - Criar novo protocolo
- `PUT /api/protocols/[id]` - Atualizar protocolo
- `DELETE /api/protocols/[id]` - Deletar protocolo

## 📚 Documentação da API

### Swagger UI Interativo
Acesse a documentação completa da API com interface interativa:
- **URL**: http://localhost:3000/api-docs
- **Funcionalidades**: Teste endpoints diretamente no navegador
- **Especificação**: OpenAPI 3.0 completa

### Especificação JSON
Para integração com outras ferramentas:
- **URL**: http://localhost:3000/api/swagger.json
- **Formato**: OpenAPI 3.0 JSON
- **Uso**: Importar em Postman, Insomnia, etc.

### Documentação Detalhada
- **Arquivo**: `docs/API.md`
- **Conteúdo**: Guia completo de integração
- **Exemplos**: Códigos curl e JavaScript

### Exemplo de Uso
```bash
# Criar uma nova cepa
curl -X POST http://localhost:3000/api/strains \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nova Cepa de Shiitake",
    "species": "Lentinula edodes",
    "description": "Cepa adaptada ao clima brasileiro",
    "origin": "EMBRAPA",
    "characteristics": "[\"adaptada ao clima tropical\", \"textura firme\"]"
  }'
```

## 📝 Exemplos de Uso

### Criar uma nova cepa:
```bash
curl -X POST http://localhost:3000/api/strains \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pleurotus ostreatus",
    "species": "Pleurotus ostreatus",
    "description": "Cogumelo ostra",
    "origin": "Brasil",
    "characteristics": ["comestível", "cultivável"]
  }'
```

### Listar todos os substratos:
```bash
curl http://localhost:3000/api/substrates
```

### Atualizar um protocolo:
```bash
curl -X PUT http://localhost:3000/api/protocols/[id] \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Inoculação de substrato",
    "type": "inoculação",
    "steps": ["Preparar substrato", "Inocular", "Incubar"],
    "duration": 30
  }'
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── strains/
│   │   ├── culture-types/
│   │   ├── grow-parameters/
│   │   ├── substrates/
│   │   ├── consumable-items/
│   │   ├── durable-items/
│   │   └── protocols/
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── prisma.ts
│   └── schemas.ts
prisma/
└── schema.prisma
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Constrói a aplicação para produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código

## 📄 Licença

Este projeto está sob a licença MIT.
