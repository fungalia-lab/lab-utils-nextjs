import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  await prisma.protocol.deleteMany()
  await prisma.durableItem.deleteMany()
  await prisma.consumableItem.deleteMany()
  await prisma.substrate.deleteMany()
  await prisma.growParameter.deleteMany()
  await prisma.cultureType.deleteMany()
  await prisma.strain.deleteMany()

  console.log('🧹 Dados existentes removidos')

  // 1. Criar Strains (Cepas)
  const strains = await Promise.all([
    prisma.strain.create({
      data: {
        name: 'Pleurotus ostreatus - Cepa A',
        species: 'Pleurotus ostreatus',
        description: 'Cepa comercial de shimeji branco, alta produtividade',
        origin: 'Laboratório de Micologia - UFSC',
        characteristics: JSON.stringify(['alta produtividade', 'resistente a contaminação', 'coloração branca'])
      }
    }),
    prisma.strain.create({
      data: {
        name: 'Ganoderma lucidum - Cepa Premium',
        species: 'Ganoderma lucidum',
        description: 'Cepa de reishi com alta concentração de triterpenos',
        origin: 'Instituto de Biotecnologia - USP',
        characteristics: JSON.stringify(['alta concentração de triterpenos', 'crescimento lento', 'coloração vermelha'])
      }
    }),
    prisma.strain.create({
      data: {
        name: 'Lentinula edodes - Cepa B',
        species: 'Lentinula edodes',
        description: 'Cepa de shiitake adaptada ao clima brasileiro',
        origin: 'EMBRAPA',
        characteristics: JSON.stringify(['adaptada ao clima tropical', 'textura firme', 'sabor intenso'])
      }
    }),
    prisma.strain.create({
      data: {
        name: 'Agaricus bisporus - Cepa Híbrida',
        species: 'Agaricus bisporus',
        description: 'Cepa híbrida de champignon com melhor rendimento',
        origin: 'Laboratório Privado - SP',
        characteristics: JSON.stringify(['rendimento superior', 'resistência a doenças', 'coloração branca'])
      }
    })
  ])

  console.log(`✅ ${strains.length} cepas criadas`)

  // 2. Criar Culture Types (Tipos de Cultura)
  const cultureTypes = await Promise.all([
    prisma.cultureType.create({
      data: {
        name: 'Cultura de Pleurotus',
        description: 'Protocolo padrão para cultivo de Pleurotus ostreatus',
        medium: 'PDA',
        temperature: 25,
        humidity: 85,
        ph: 6.5
      }
    }),
    prisma.cultureType.create({
      data: {
        name: 'Cultura de Ganoderma',
        description: 'Protocolo especializado para Ganoderma lucidum',
        medium: 'MEA',
        temperature: 28,
        humidity: 90,
        ph: 7.0
      }
    }),
    prisma.cultureType.create({
      data: {
        name: 'Cultura de Shiitake',
        description: 'Protocolo para Lentinula edodes em serragem',
        medium: 'Sabouraud',
        temperature: 24,
        humidity: 80,
        ph: 6.0
      }
    }),
    prisma.cultureType.create({
      data: {
        name: 'Cultura de Champignon',
        description: 'Protocolo tradicional para Agaricus bisporus',
        medium: 'PDA',
        temperature: 22,
        humidity: 75,
        ph: 7.5
      }
    })
  ])

  console.log(`✅ ${cultureTypes.length} tipos de cultura criados`)

  // 3. Criar Grow Parameters (Parâmetros de Crescimento)
  const growParameters = await Promise.all([
    prisma.growParameter.create({
      data: {
        name: 'Temperatura de Crescimento',
        type: 'temperatura',
        unit: '°C',
        minValue: 20,
        optimalValue: 25,
        maxValue: 30,
        description: 'Temperatura ideal para crescimento micelial'
      }
    }),
    prisma.growParameter.create({
      data: {
        name: 'Umidade Relativa',
        type: 'umidade',
        unit: '%',
        minValue: 70,
        optimalValue: 85,
        maxValue: 95,
        description: 'Umidade relativa do ar para desenvolvimento'
      }
    }),
    prisma.growParameter.create({
      data: {
        name: 'pH do Substrato',
        type: 'ph',
        unit: 'pH',
        minValue: 5.5,
        optimalValue: 6.5,
        maxValue: 7.5,
        description: 'pH ideal do substrato de cultivo'
      }
    }),
    prisma.growParameter.create({
      data: {
        name: 'Intensidade Luminosa',
        type: 'luz',
        unit: 'lux',
        minValue: 100,
        optimalValue: 500,
        maxValue: 1000,
        description: 'Intensidade luminosa para formação de corpos frutíferos'
      }
    }),
    prisma.growParameter.create({
      data: {
        name: 'Concentração de CO2',
        type: 'gas',
        unit: 'ppm',
        minValue: 400,
        optimalValue: 800,
        maxValue: 1200,
        description: 'Concentração de CO2 para desenvolvimento'
      }
    })
  ])

  console.log(`✅ ${growParameters.length} parâmetros de crescimento criados`)

  // 4. Criar Substrates (Substratos)
  const substrates = await Promise.all([
    prisma.substrate.create({
      data: {
        name: 'Serragem de Eucalipto',
        type: 'orgânico',
        composition: 'Celulose 45%, Lignina 30%, Hemicelulose 20%, Minerais 5%',
        ph: 6.2,
        nutrients: JSON.stringify(['nitrogênio', 'fósforo', 'potássio', 'magnésio', 'cálcio']),
        description: 'Substrato padrão para cultivo de cogumelos'
      }
    }),
    prisma.substrate.create({
      data: {
        name: 'Palha de Arroz',
        type: 'orgânico',
        composition: 'Celulose 35%, Lignina 15%, Hemicelulose 25%, Silício 20%',
        ph: 7.0,
        nutrients: JSON.stringify(['silício', 'nitrogênio', 'fósforo', 'potássio']),
        description: 'Substrato rico em silício para cultivo especializado'
      }
    }),
    prisma.substrate.create({
      data: {
        name: 'Casca de Café',
        type: 'orgânico',
        composition: 'Celulose 40%, Lignina 25%, Cafeína 2%, Minerais 15%',
        ph: 5.8,
        nutrients: JSON.stringify(['nitrogênio', 'fósforo', 'potássio', 'cafeína']),
        description: 'Substrato com propriedades estimulantes naturais'
      }
    }),
    prisma.substrate.create({
      data: {
        name: 'Substrato Sintético PDA',
        type: 'sintético',
        composition: 'Ágar 1.5%, Dextrose 2%, Batata 20%, Água 76.5%',
        ph: 6.5,
        nutrients: JSON.stringify(['carboidratos', 'vitaminas', 'minerais']),
        description: 'Meio de cultura sintético para isolamento'
      }
    })
  ])

  console.log(`✅ ${substrates.length} substratos criados`)

  // 5. Criar Consumable Items (Itens Consumíveis)
  const consumableItems = await Promise.all([
    prisma.consumableItem.create({
      data: {
        name: 'Ágar PDA',
        category: 'meio de cultura',
        unit: 'g',
        supplier: 'Sigma-Aldrich',
        catalogNumber: 'P6366-500G',
        description: 'Ágar Potato Dextrose para cultivo de fungos'
      }
    }),
    prisma.consumableItem.create({
      data: {
        name: 'Ágar MEA',
        category: 'meio de cultura',
        unit: 'g',
        supplier: 'Merck',
        catalogNumber: '1.05463.0500',
        description: 'Ágar Malt Extract para isolamento de fungos'
      }
    }),
    prisma.consumableItem.create({
      data: {
        name: 'Placas Petri',
        category: 'equipamento descartável',
        unit: 'unidades',
        supplier: 'Corning',
        catalogNumber: '430166',
        description: 'Placas Petri estéreis 90mm'
      }
    }),
    prisma.consumableItem.create({
      data: {
        name: 'Algodão Hidrófobo',
        category: 'material de laboratório',
        unit: 'g',
        supplier: 'LabSynth',
        catalogNumber: 'LS-001',
        description: 'Algodão para tampões de frascos'
      }
    }),
    prisma.consumableItem.create({
      data: {
        name: 'Papel Alumínio',
        category: 'material de laboratório',
        unit: 'm',
        supplier: 'Local',
        catalogNumber: 'PA-001',
        description: 'Papel alumínio para embalagem'
      }
    })
  ])

  console.log(`✅ ${consumableItems.length} itens consumíveis criados`)

  // 6. Criar Durable Items (Itens Duráveis)
  const durableItems = await Promise.all([
    prisma.durableItem.create({
      data: {
        name: 'Autoclave Vertical',
        category: 'equipamento',
        brand: 'Phoenix',
        model: 'AV-50',
        serialNumber: 'AV50-2023-001',
        location: 'Laboratório Principal',
        description: 'Autoclave vertical 50L para esterilização'
      }
    }),
    prisma.durableItem.create({
      data: {
        name: 'Microscópio Óptico',
        category: 'equipamento',
        brand: 'Olympus',
        model: 'CX23',
        serialNumber: 'CX23-2023-002',
        location: 'Laboratório de Análise',
        description: 'Microscópio óptico para análise morfológica'
      }
    }),
    prisma.durableItem.create({
      data: {
        name: 'Estufa de Incubação',
        category: 'equipamento',
        brand: 'Thermo Fisher',
        model: 'Heratherm',
        serialNumber: 'HT-2023-003',
        location: 'Sala de Crescimento',
        description: 'Estufa com controle de temperatura e umidade'
      }
    }),
    prisma.durableItem.create({
      data: {
        name: 'Balança Analítica',
        category: 'equipamento',
        brand: 'Mettler Toledo',
        model: 'XS205',
        serialNumber: 'XS205-2023-004',
        location: 'Laboratório Principal',
        description: 'Balança analítica com precisão de 0.01mg'
      }
    }),
    prisma.durableItem.create({
      data: {
        name: 'pHmetro Portátil',
        category: 'equipamento',
        brand: 'Hanna Instruments',
        model: 'HI98128',
        serialNumber: 'HI98128-2023-005',
        location: 'Laboratório Principal',
        description: 'Medidor de pH portátil com compensação de temperatura'
      }
    })
  ])

  console.log(`✅ ${durableItems.length} itens duráveis criados`)

  // 7. Criar Protocols (Protocolos)
  const protocols = await Promise.all([
    prisma.protocol.create({
      data: {
        name: 'Inoculação de Substrato',
        type: 'inoculação',
        steps: JSON.stringify([
          'Esterilizar substrato em autoclave a 121°C por 60min',
          'Resfriar substrato até temperatura ambiente',
          'Preparar inóculo em condições assépticas',
          'Inocular substrato com 5% de inóculo',
          'Misturar uniformemente',
          'Acondicionar em sacos plásticos',
          'Incubar a 25°C por 15 dias'
        ]),
        duration: 60,
        temperature: 25,
        equipment: JSON.stringify(['autoclave', 'balança', 'pHmetro', 'estufa']),
        materials: JSON.stringify(['substrato', 'inóculo', 'sacos plásticos', 'algodão']),
        description: 'Protocolo padrão para inoculação de substrato com micélio'
      }
    }),
    prisma.protocol.create({
      data: {
        name: 'Transferência de Cultura',
        type: 'transferência',
        steps: JSON.stringify([
          'Preparar meio de cultura estéril',
          'Abrir placa fonte em condições assépticas',
          'Selecionar micélio saudável',
          'Transferir fragmento para nova placa',
          'Sellar placa com fita adesiva',
          'Identificar com etiqueta',
          'Incubar a temperatura adequada'
        ]),
        duration: 15,
        temperature: 25,
        equipment: JSON.stringify(['microscópio', 'bico de Bunsen', 'pinça']),
        materials: JSON.stringify(['placas Petri', 'meio de cultura', 'fita adesiva', 'etiquetas']),
        description: 'Protocolo para transferência asséptica de culturas'
      }
    }),
    prisma.protocol.create({
      data: {
        name: 'Análise de Contaminação',
        type: 'análise',
        steps: JSON.stringify([
          'Coletar amostra representativa',
          'Preparar suspensão em solução salina',
          'Fazer diluições seriadas',
          'Semear em placas de ágar',
          'Incubar por 48-72h',
          'Contar colônias',
          'Calcular UFC/g de substrato'
        ]),
        duration: 180,
        temperature: 30,
        equipment: JSON.stringify(['microscópio', 'pipetas', 'estufa', 'contador de colônias']),
        materials: JSON.stringify(['placas Petri', 'solução salina', 'meio de cultura']),
        description: 'Protocolo para análise microbiológica de contaminação'
      }
    }),
    prisma.protocol.create({
      data: {
        name: 'Colheita de Cogumelos',
        type: 'colheita',
        steps: JSON.stringify([
          'Identificar estágio ideal de colheita',
          'Higienizar mãos e equipamentos',
          'Colher cogumelos com cuidado',
          'Remover substrato aderido',
          'Classificar por tamanho e qualidade',
          'Acondicionar em embalagens adequadas',
          'Armazenar em temperatura controlada'
        ]),
        duration: 30,
        temperature: 15,
        equipment: JSON.stringify(['balança', 'termômetro', 'refrigerador']),
        materials: JSON.stringify(['embalagens', 'etiquetas', 'papel absorvente']),
        description: 'Protocolo para colheita e pós-colheita de cogumelos'
      }
    })
  ])

  console.log(`✅ ${protocols.length} protocolos criados`)

  console.log('🎉 Seed concluído com sucesso!')
  console.log(`📊 Resumo:`)
  console.log(`   - ${strains.length} cepas`)
  console.log(`   - ${cultureTypes.length} tipos de cultura`)
  console.log(`   - ${growParameters.length} parâmetros de crescimento`)
  console.log(`   - ${substrates.length} substratos`)
  console.log(`   - ${consumableItems.length} itens consumíveis`)
  console.log(`   - ${durableItems.length} itens duráveis`)
  console.log(`   - ${protocols.length} protocolos`)
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
