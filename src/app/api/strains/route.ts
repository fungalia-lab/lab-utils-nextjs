import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { strainCreateSchema } from '@/lib/schemas'

/**
 * @swagger
 * /api/strains:
 *   get:
 *     summary: Listar todas as cepas
 *     description: Retorna uma lista de todas as cepas cadastradas no sistema, ordenadas por data de criação (mais recentes primeiro)
 *     tags: [Strains]
 *     responses:
 *       200:
 *         description: Lista de cepas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Strain'
 *             example:
 *               - id: "cmf8tfrcr0000mqm0b8btdbgj"
 *                 name: "Pleurotus ostreatus - Cepa A"
 *                 species: "Pleurotus ostreatus"
 *                 description: "Cepa comercial de shimeji branco, alta produtividade"
 *                 origin: "Laboratório de Micologia - UFSC"
 *                 characteristics: "[\"alta produtividade\", \"resistente a contaminação\", \"coloração branca\"]"
 *                 createdAt: "2025-09-06T22:08:38.714Z"
 *                 updatedAt: "2025-09-06T22:08:38.714Z"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export async function GET() {
  try {
    const strains = await prisma.strain.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(strains)
  } catch (error) {
    console.error('Error fetching strains:', error)
    return NextResponse.json(
      { error: 'Failed to fetch strains' },
      { status: 500 }
    )
  }
}

/**
 * @swagger
 * /api/strains:
 *   post:
 *     summary: Criar nova cepa
 *     description: Cria uma nova cepa no sistema com os dados fornecidos
 *     tags: [Strains]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, species]
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da cepa
 *                 example: "Pleurotus ostreatus - Cepa A"
 *               species:
 *                 type: string
 *                 description: Espécie da cepa
 *                 example: "Pleurotus ostreatus"
 *               description:
 *                 type: string
 *                 description: Descrição da cepa
 *                 example: "Cepa comercial de shimeji branco, alta produtividade"
 *               origin:
 *                 type: string
 *                 description: Origem da cepa
 *                 example: "Laboratório de Micologia - UFSC"
 *               characteristics:
 *                 type: string
 *                 description: Características da cepa (JSON string)
 *                 example: "[\"alta produtividade\", \"resistente a contaminação\"]"
 *           example:
 *             name: "Nova Cepa de Shiitake"
 *             species: "Lentinula edodes"
 *             description: "Cepa adaptada ao clima brasileiro"
 *             origin: "EMBRAPA"
 *             characteristics: "[\"adaptada ao clima tropical\", \"textura firme\"]"
 *     responses:
 *       201:
 *         description: Cepa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Strain'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = strainCreateSchema.parse(body)
    
    const strain = await prisma.strain.create({
      data: validatedData,
    })
    
    return NextResponse.json(strain, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }
    
    console.error('Error creating strain:', error)
    return NextResponse.json(
      { error: 'Failed to create strain' },
      { status: 500 }
    )
  }
}
