import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { protocolCreateSchema } from '@/lib/schemas'

// GET /api/protocols - List all protocols
export async function GET() {
  try {
    const protocols = await prisma.protocol.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(protocols)
  } catch (error) {
    console.error('Error fetching protocols:', error)
    return NextResponse.json(
      { error: 'Failed to fetch protocols' },
      { status: 500 }
    )
  }
}

// POST /api/protocols - Create a new protocol
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = protocolCreateSchema.parse(body)
    
    const protocol = await prisma.protocol.create({
      data: validatedData,
    })
    
    return NextResponse.json(protocol, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }
    
    console.error('Error creating protocol:', error)
    return NextResponse.json(
      { error: 'Failed to create protocol' },
      { status: 500 }
    )
  }
}
