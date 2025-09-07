# FungaliaLab Catalog API Documentation

## 📚 Visão Geral

A **FungaliaLab Catalog API** é um microserviço REST que fornece um catálogo mestre para laboratórios IoT/laboratoriais. Esta API permite gerenciar todas as entidades necessárias para operações de laboratório, incluindo cepas, tipos de cultura, parâmetros de crescimento, substratos, itens consumíveis, itens duráveis e protocolos.

## 🔗 Acesso à Documentação

- **Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **OpenAPI JSON**: [http://localhost:3000/api/swagger.json](http://localhost:3000/api/swagger.json)

## 🏗️ Arquitetura da API

### Base URL
```
http://localhost:3000/api
```

### Padrão de Endpoints
Todos os endpoints seguem o padrão REST:

```
GET    /api/{entity}           # Listar todos
GET    /api/{entity}/{id}      # Buscar por ID
POST   /api/{entity}           # Criar novo
PUT    /api/{entity}/{id}      # Atualizar
DELETE /api/{entity}/{id}      # Excluir
```

## 📋 Entidades Disponíveis

### 🧬 Strains (Cepas)
**Endpoint**: `/api/strains`

Gerencia cepas de fungos/bactérias com características específicas.

**Campos**:
- `name` (string, obrigatório) - Nome da cepa
- `species` (string, obrigatório) - Espécie
- `description` (string, opcional) - Descrição
- `origin` (string, opcional) - Origem da cepa
- `characteristics` (string) - Características em JSON

**Exemplo**:
```json
{
  "name": "Pleurotus ostreatus - Cepa A",
  "species": "Pleurotus ostreatus",
  "description": "Cepa comercial de shimeji branco",
  "origin": "Laboratório de Micologia - UFSC",
  "characteristics": "[\"alta produtividade\", \"resistente a contaminação\"]"
}
```

### 🧪 Culture Types (Tipos de Cultura)
**Endpoint**: `/api/culture-types`

Define tipos de cultura com parâmetros específicos.

**Campos**:
- `name` (string, obrigatório) - Nome do tipo
- `description` (string, opcional) - Descrição
- `medium` (string, opcional) - Meio de cultura
- `temperature` (number, opcional) - Temperatura ideal (°C)
- `humidity` (number, opcional) - Umidade ideal (%)
- `ph` (number, opcional) - pH ideal

### 📊 Grow Parameters (Parâmetros de Crescimento)
**Endpoint**: `/api/grow-parameters`

Gerencia parâmetros de crescimento com valores min/max/ótimo.

**Campos**:
- `name` (string, obrigatório) - Nome do parâmetro
- `type` (string, obrigatório) - Tipo (temperatura, umidade, ph, luz, gas)
- `unit` (string, obrigatório) - Unidade de medida
- `minValue` (number, opcional) - Valor mínimo
- `maxValue` (number, opcional) - Valor máximo
- `optimalValue` (number, opcional) - Valor ótimo

### 🌱 Substrates (Substratos)
**Endpoint**: `/api/substrates`

Gerencia substratos com composição e nutrientes.

**Campos**:
- `name` (string, obrigatório) - Nome do substrato
- `type` (string, obrigatório) - Tipo (orgânico, inorgânico, sintético)
- `composition` (string, opcional) - Composição química
- `ph` (number, opcional) - pH do substrato
- `nutrients` (string) - Nutrientes em JSON
- `description` (string, opcional) - Descrição

### 📦 Consumable Items (Itens Consumíveis)
**Endpoint**: `/api/consumable-items`

Gerencia itens consumíveis do laboratório.

**Campos**:
- `name` (string, obrigatório) - Nome do item
- `category` (string, obrigatório) - Categoria
- `unit` (string, obrigatório) - Unidade de medida
- `supplier` (string, opcional) - Fornecedor
- `catalogNumber` (string, opcional) - Número de catálogo
- `description` (string, opcional) - Descrição

### 🔧 Durable Items (Itens Duráveis)
**Endpoint**: `/api/durable-items`

Gerencia equipamentos e itens duráveis.

**Campos**:
- `name` (string, obrigatório) - Nome do item
- `category` (string, obrigatório) - Categoria
- `brand` (string, opcional) - Marca
- `model` (string, opcional) - Modelo
- `serialNumber` (string, opcional) - Número de série
- `location` (string, opcional) - Localização
- `description` (string, opcional) - Descrição

### 📋 Protocols (Protocolos)
**Endpoint**: `/api/protocols`

Gerencia protocolos e ações do laboratório.

**Campos**:
- `name` (string, obrigatório) - Nome do protocolo
- `type` (string, obrigatório) - Tipo (inoculação, transferência, análise, colheita)
- `steps` (string) - Passos em JSON
- `duration` (integer, opcional) - Duração (minutos)
- `temperature` (number, opcional) - Temperatura necessária (°C)
- `equipment` (string) - Equipamentos em JSON
- `materials` (string) - Materiais em JSON
- `description` (string, opcional) - Descrição

## 🔧 Exemplos de Uso

### Criar uma Nova Cepa
```bash
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

### Listar Todas as Cepas
```bash
curl http://localhost:3000/api/strains
```

### Buscar Cepa por ID
```bash
curl http://localhost:3000/api/strains/cmf8tfrcr0000mqm0b8btdbgj
```

### Atualizar uma Cepa
```bash
curl -X PUT http://localhost:3000/api/strains/cmf8tfrcr0000mqm0b8btdbgj \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Descrição atualizada",
    "characteristics": "[\"alta produtividade\", \"resistente\", \"nova característica\"]"
  }'
```

### Excluir uma Cepa
```bash
curl -X DELETE http://localhost:3000/api/strains/cmf8tfrcr0000mqm0b8btdbgj
```

## 📊 Códigos de Resposta

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso (GET, PUT, DELETE) |
| 201 | Criado com sucesso (POST) |
| 400 | Erro de validação |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

## 🔒 Autenticação

Atualmente, a API não possui autenticação implementada. Para produção, recomenda-se implementar:

- **JWT Tokens** para autenticação
- **API Keys** para acesso programático
- **Rate Limiting** para proteção contra abuso

## 🛠️ Validação de Dados

Todos os dados são validados usando **Zod schemas**:

- Campos obrigatórios são validados
- Tipos de dados são verificados
- Formatos específicos são validados (JSON strings, etc.)
- Mensagens de erro detalhadas são retornadas

## 📝 Timestamps Automáticos

Todos os recursos incluem timestamps automáticos:

- `createdAt` - Data de criação (ISO 8601)
- `updatedAt` - Data de última atualização (ISO 8601)

## 🔄 Integração com Outros Sistemas

### Headers Recomendados
```http
Content-Type: application/json
Accept: application/json
User-Agent: SeuSistema/1.0
```

### Tratamento de Erros
```json
{
  "error": "Validation error",
  "details": "Name is required"
}
```

### Paginação (Futuro)
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

## 🚀 Desenvolvimento

### Executar Localmente
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Popular banco com dados iniciais
npm run db:seed
```

### Testar API
```bash
# Usar Swagger UI
open http://localhost:3000/api-docs

# Ou usar curl/Postman
curl http://localhost:3000/api/strains
```

## 📞 Suporte

Para dúvidas ou sugestões sobre a API:

- **Email**: contato@fungalialab.com
- **Website**: https://fungalialab.com
- **Documentação**: http://localhost:3000/api-docs

---

**Versão da API**: 1.0.0  
**Última atualização**: Setembro 2025
