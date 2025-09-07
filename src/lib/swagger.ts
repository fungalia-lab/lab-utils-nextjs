const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'FungaliaLab Catalog API',
    version: '1.0.0',
    description: `
      # FungaliaLab Catalog Microservice API
      
      Este é um microserviço de catálogo para laboratórios IoT/laboratoriais, 
      fornecendo um conjunto de tabelas que funcionam como "catálogo mestre" 
      de um laboratório.
      
      ## Funcionalidades
      
      - **CRUD Completo** para todas as entidades
      - **Rastreabilidade** com timestamps automáticos
      - **Validação** robusta com Zod schemas
      - **API REST** padronizada
      
      ## Entidades Disponíveis
      
      - **Strains**: Cepas de fungos/bactérias
      - **Culture Types**: Tipos de cultura
      - **Grow Parameters**: Parâmetros de crescimento
      - **Substrates**: Substratos
      - **Consumable Items**: Itens consumíveis
      - **Durable Items**: Itens duráveis
      - **Protocols**: Protocolos/Ações
      
      ## Autenticação
      
      Atualmente não há autenticação implementada. Em produção, recomenda-se 
      implementar autenticação JWT ou API Keys.
      
      ## Rate Limiting
      
      Não há rate limiting implementado. Em produção, recomenda-se implementar 
      rate limiting para proteger a API.
    `,
    contact: {
      name: 'FungaliaLab Team',
      email: 'contato@fungalialab.com',
      url: 'https://fungalialab.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de Desenvolvimento'
    },
    {
      url: 'https://api.fungalialab.com',
      description: 'Servidor de Produção'
    }
  ],
  components: {
    schemas: {
      Strain: {
        type: 'object',
        required: ['name', 'species'],
        properties: {
          id: {
            type: 'string',
            description: 'ID único da cepa (CUID)',
            example: 'cmf8tfrcr0000mqm0b8btdbgj'
          },
          name: {
            type: 'string',
            description: 'Nome da cepa',
            example: 'Pleurotus ostreatus - Cepa A'
          },
          species: {
            type: 'string',
            description: 'Espécie da cepa',
            example: 'Pleurotus ostreatus'
          },
          description: {
            type: 'string',
            description: 'Descrição da cepa',
            example: 'Cepa comercial de shimeji branco, alta produtividade'
          },
          origin: {
            type: 'string',
            description: 'Origem da cepa',
            example: 'Laboratório de Micologia - UFSC'
          },
          characteristics: {
            type: 'string',
            description: 'Características da cepa (JSON string)',
            example: '["alta produtividade", "resistente a contaminação", "coloração branca"]'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de criação',
            example: '2025-09-06T22:08:38.714Z'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de última atualização',
            example: '2025-09-06T22:08:38.714Z'
          }
        }
      },
      CultureType: {
        type: 'object',
        required: ['name'],
        properties: {
          id: {
            type: 'string',
            description: 'ID único do tipo de cultura (CUID)',
            example: 'cmf8tfrcr0004mqm0cjcyxvsd'
          },
          name: {
            type: 'string',
            description: 'Nome do tipo de cultura',
            example: 'Cultura de Pleurotus'
          },
          description: {
            type: 'string',
            description: 'Descrição do tipo de cultura',
            example: 'Protocolo padrão para cultivo de Pleurotus ostreatus'
          },
          medium: {
            type: 'string',
            description: 'Meio de cultura',
            example: 'PDA'
          },
          temperature: {
            type: 'number',
            description: 'Temperatura ideal em °C',
            example: 25
          },
          humidity: {
            type: 'number',
            description: 'Umidade ideal em %',
            example: 85
          },
          ph: {
            type: 'number',
            description: 'pH ideal',
            example: 6.5
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de criação'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de última atualização'
          }
        }
      },
      GrowParameter: {
        type: 'object',
        required: ['name', 'type', 'unit'],
        properties: {
          id: {
            type: 'string',
            description: 'ID único do parâmetro (CUID)'
          },
          name: {
            type: 'string',
            description: 'Nome do parâmetro',
            example: 'Temperatura de Crescimento'
          },
          type: {
            type: 'string',
            description: 'Tipo do parâmetro',
            example: 'temperatura',
            enum: ['temperatura', 'umidade', 'ph', 'luz', 'gas']
          },
          unit: {
            type: 'string',
            description: 'Unidade de medida',
            example: '°C'
          },
          minValue: {
            type: 'number',
            description: 'Valor mínimo',
            example: 20
          },
          maxValue: {
            type: 'number',
            description: 'Valor máximo',
            example: 30
          },
          optimalValue: {
            type: 'number',
            description: 'Valor ótimo',
            example: 25
          },
          description: {
            type: 'string',
            description: 'Descrição do parâmetro'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de criação'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de última atualização'
          }
        }
      },
      Substrate: {
        type: 'object',
        required: ['name', 'type'],
        properties: {
          id: {
            type: 'string',
            description: 'ID único do substrato (CUID)'
          },
          name: {
            type: 'string',
            description: 'Nome do substrato',
            example: 'Serragem de Eucalipto'
          },
          type: {
            type: 'string',
            description: 'Tipo do substrato',
            example: 'orgânico',
            enum: ['orgânico', 'inorgânico', 'sintético']
          },
          composition: {
            type: 'string',
            description: 'Composição química',
            example: 'Celulose 45%, Lignina 30%, Hemicelulose 20%, Minerais 5%'
          },
          ph: {
            type: 'number',
            description: 'pH do substrato',
            example: 6.2
          },
          nutrients: {
            type: 'string',
            description: 'Nutrientes (JSON string)',
            example: '["nitrogênio", "fósforo", "potássio", "magnésio", "cálcio"]'
          },
          description: {
            type: 'string',
            description: 'Descrição do substrato'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de criação'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de última atualização'
          }
        }
      },
      ConsumableItem: {
        type: 'object',
        required: ['name', 'category', 'unit'],
        properties: {
          id: {
            type: 'string',
            description: 'ID único do item (CUID)'
          },
          name: {
            type: 'string',
            description: 'Nome do item',
            example: 'Ágar PDA'
          },
          category: {
            type: 'string',
            description: 'Categoria do item',
            example: 'meio de cultura'
          },
          unit: {
            type: 'string',
            description: 'Unidade de medida',
            example: 'g'
          },
          supplier: {
            type: 'string',
            description: 'Fornecedor',
            example: 'Sigma-Aldrich'
          },
          catalogNumber: {
            type: 'string',
            description: 'Número de catálogo',
            example: 'P6366-500G'
          },
          description: {
            type: 'string',
            description: 'Descrição do item'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de criação'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de última atualização'
          }
        }
      },
      DurableItem: {
        type: 'object',
        required: ['name', 'category'],
        properties: {
          id: {
            type: 'string',
            description: 'ID único do item (CUID)'
          },
          name: {
            type: 'string',
            description: 'Nome do item',
            example: 'Autoclave Vertical'
          },
          category: {
            type: 'string',
            description: 'Categoria do item',
            example: 'equipamento'
          },
          brand: {
            type: 'string',
            description: 'Marca',
            example: 'Phoenix'
          },
          model: {
            type: 'string',
            description: 'Modelo',
            example: 'AV-50'
          },
          serialNumber: {
            type: 'string',
            description: 'Número de série',
            example: 'AV50-2023-001'
          },
          location: {
            type: 'string',
            description: 'Localização no laboratório',
            example: 'Laboratório Principal'
          },
          description: {
            type: 'string',
            description: 'Descrição do item'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de criação'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de última atualização'
          }
        }
      },
      Protocol: {
        type: 'object',
        required: ['name', 'type'],
        properties: {
          id: {
            type: 'string',
            description: 'ID único do protocolo (CUID)'
          },
          name: {
            type: 'string',
            description: 'Nome do protocolo',
            example: 'Inoculação de Substrato'
          },
          type: {
            type: 'string',
            description: 'Tipo do protocolo',
            example: 'inoculação',
            enum: ['inoculação', 'transferência', 'análise', 'colheita']
          },
          steps: {
            type: 'string',
            description: 'Passos do protocolo (JSON string)',
            example: '["Esterilizar substrato", "Resfriar substrato", "Preparar inóculo"]'
          },
          duration: {
            type: 'integer',
            description: 'Duração em minutos',
            example: 60
          },
          temperature: {
            type: 'number',
            description: 'Temperatura necessária em °C',
            example: 25
          },
          equipment: {
            type: 'string',
            description: 'Equipamentos necessários (JSON string)',
            example: '["autoclave", "balança", "pHmetro", "estufa"]'
          },
          materials: {
            type: 'string',
            description: 'Materiais necessários (JSON string)',
            example: '["substrato", "inóculo", "sacos plásticos", "algodão"]'
          },
          description: {
            type: 'string',
            description: 'Descrição do protocolo'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de criação'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de última atualização'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Mensagem de erro',
            example: 'Validation error'
          },
          details: {
            type: 'string',
            description: 'Detalhes do erro',
            example: 'Name is required'
          }
        }
      }
    },
    responses: {
      NotFound: {
        description: 'Recurso não encontrado',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      },
      ValidationError: {
        description: 'Erro de validação',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      },
      InternalServerError: {
        description: 'Erro interno do servidor',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      }
    }
  },
  tags: [
    {
      name: 'Strains',
      description: 'Operações relacionadas a cepas de fungos/bactérias'
    },
    {
      name: 'Culture Types',
      description: 'Operações relacionadas a tipos de cultura'
    },
    {
      name: 'Grow Parameters',
      description: 'Operações relacionadas a parâmetros de crescimento'
    },
    {
      name: 'Substrates',
      description: 'Operações relacionadas a substratos'
    },
    {
      name: 'Consumable Items',
      description: 'Operações relacionadas a itens consumíveis'
    },
    {
      name: 'Durable Items',
      description: 'Operações relacionadas a itens duráveis'
    },
    {
      name: 'Protocols',
      description: 'Operações relacionadas a protocolos/ações'
    }
  ]
}

export { swaggerSpec }