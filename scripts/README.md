# Scripts de Banco de Dados

Este diretório contém scripts para gerenciar o banco de dados do FungaliaLab Catalog.

## 📋 Scripts Disponíveis

### `seed.ts` - População Inicial do Banco

Script para popular o banco de dados com dados iniciais realistas para um laboratório de fungos.

#### Dados Incluídos:

**🧬 Strains (4 cepas):**
- Pleurotus ostreatus - Cepa A
- Ganoderma lucidum - Cepa Premium  
- Lentinula edodes - Cepa B
- Agaricus bisporus - Cepa Híbrida

**🧪 Culture Types (4 tipos):**
- Cultura de Pleurotus (PDA, 25°C, 85% UR, pH 6.5)
- Cultura de Ganoderma (MEA, 28°C, 90% UR, pH 7.0)
- Cultura de Shiitake (Sabouraud, 24°C, 80% UR, pH 6.0)
- Cultura de Champignon (PDA, 22°C, 75% UR, pH 7.5)

**📊 Grow Parameters (5 parâmetros):**
- Temperatura de Crescimento (20-30°C, ótimo 25°C)
- Umidade Relativa (70-95%, ótimo 85%)
- pH do Substrato (5.5-7.5, ótimo 6.5)
- Intensidade Luminosa (100-1000 lux, ótimo 500 lux)
- Concentração de CO2 (400-1200 ppm, ótimo 800 ppm)

**🌱 Substrates (4 substratos):**
- Serragem de Eucalipto (orgânico, pH 6.2)
- Palha de Arroz (orgânico, pH 7.0)
- Casca de Café (orgânico, pH 5.8)
- Substrato Sintético PDA (sintético, pH 6.5)

**📦 Consumable Items (5 itens):**
- Ágar PDA (Sigma-Aldrich)
- Ágar MEA (Merck)
- Placas Petri (Corning)
- Algodão Hidrófobo (LabSynth)
- Papel Alumínio (Local)

**🔧 Durable Items (5 itens):**
- Autoclave Vertical Phoenix AV-50
- Microscópio Óptico Olympus CX23
- Estufa de Incubação Thermo Fisher Heratherm
- Balança Analítica Mettler Toledo XS205
- pHmetro Portátil Hanna Instruments HI98128

**📋 Protocols (4 protocolos):**
- Inoculação de Substrato (60min, 25°C)
- Transferência de Cultura (15min, 25°C)
- Análise de Contaminação (180min, 30°C)
- Colheita de Cogumelos (30min, 15°C)

## 🚀 Como Usar

### População Inicial (Seed)
```bash
# Popular o banco com dados iniciais
npm run db:seed
```

### Reset Completo do Banco
```bash
# Resetar banco e popular com dados iniciais
npm run db:reset
```

### Comandos Individuais
```bash
# Apenas resetar o banco (sem dados)
npx prisma db push --force-reset

# Apenas popular dados (sem reset)
tsx scripts/seed.ts
```

## ⚠️ Avisos

- **O script `db:seed` limpa todos os dados existentes** antes de inserir os novos dados
- **Use `db:reset` apenas em desenvolvimento** - nunca em produção
- **Faça backup dos dados** antes de executar scripts de reset em produção

## 🔧 Personalização

Para adicionar novos dados ou modificar os existentes:

1. Edite o arquivo `scripts/seed.ts`
2. Adicione novos registros nas seções correspondentes
3. Execute `npm run db:seed` para aplicar as mudanças

## 📊 Estrutura dos Dados

Todos os dados seguem a estrutura definida no schema Prisma:
- **IDs únicos** gerados automaticamente (CUID)
- **Timestamps** automáticos (createdAt/updatedAt)
- **Campos JSON** para arrays (características, nutrientes, passos, etc.)
- **Validação** com Zod schemas
