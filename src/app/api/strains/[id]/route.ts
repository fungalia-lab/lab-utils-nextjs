import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { strainUpdateSchema } from '@/lib/schemas'

/**
 * @swagger
 * /api/strains/{id}:
 *   get:
 *     summary: Buscar cepa por ID
 *     description: Retorna uma cepa específica baseada no ID fornecido
 *     tags: [Strains]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único da cepa
 *         schema:
 *           type: string
 *           example: "cmf8tfrcr0000mqm0b8btdbgj"
 *     responses:
 *       200:
 *         description: Cepa encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Strain'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const strain = await prisma.strain.findUnique({
      where: { id },
    })
    
    if (!strain) {
      return NextResponse.json(
        { error: 'Strain not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(strain)
  } catch (error) {
    console.error('Error fetching strain:', error)
    return NextResponse.json(
      { error: 'Failed to fetch strain' },
      { status: 500 }
    )
  }
}

/**
 * @swagger
 * /api/strains/{id}:
 *   put:
 *     summary: Atualizar cepa
 *     description: Atualiza uma cepa existente com os dados fornecidos
 *     tags: [Strains]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único da cepa
 *         schema:
 *           type: string
 *           example: "cmf8tfrcr0000mqm0b8btdbgj"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da cepa
 *               species:
 *                 type: string
 *                 description: Espécie da cepa
 *               description:
 *                 type: string
 *                 description: Descrição da cepa
 *               origin:
 *                 type: string
 *                 description: Origem da cepa
 *               characteristics:
 *                 type: string
 *                 description: Características da cepa (JSON string)
 *           example:
 *             description: "Descrição atualizada da cepa"
 *             characteristics: "[\"alta produtividade\", \"resistente\", \"nova característica\"]"
 *     responses:
 *       200:
 *         description: Cepa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Strain'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = strainUpdateSchema.parse(body)
    
    const strain = await prisma.strain.update({
      where: { id },
      data: validatedData,
    })
    
    return NextResponse.json(strain)
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }
    
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Strain not found' },
        { status: 404 }
      )
    }
    
    console.error('Error updating strain:', error)
    return NextResponse.json(
      { error: 'Failed to update strain' },
      { status: 500 }
    )
  }
}

/**
 * @swagger
 * /api/strains/{id}:
 *   delete:
 *     summary: Excluir cepa
 *     description: Remove uma cepa do sistema permanentemente
 *     tags: [Strains]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único da cepa
 *         schema:
 *           type: string
 *           example: "cmf8tfrcr0000mqm0b8btdbgj"
 *     responses:
 *       200:
 *         description: Cepa excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Strain deleted successfully"
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.strain.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Strain deleted successfully' })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Strain not found' },
        { status: 404 }
      )
    }
    
    console.error('Error deleting strain:', error)
    return NextResponse.json(
      { error: 'Failed to delete strain' },
      { status: 500 }
    )
  }
}
