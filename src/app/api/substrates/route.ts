import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { substrateCreateSchema } from '@/lib/schemas'

// GET /api/substrates - List all substrates
export async function GET() {
  try {
    const substrates = await prisma.substrate.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(substrates)
  } catch (error) {
    console.error('Error fetching substrates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch substrates' },
      { status: 500 }
    )
  }
}

// POST /api/substrates - Create a new substrate
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = substrateCreateSchema.parse(body)
    
    const substrate = await prisma.substrate.create({
      data: validatedData,
    })
    
    return NextResponse.json(substrate, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }
    
    console.error('Error creating substrate:', error)
    return NextResponse.json(
      { error: 'Failed to create substrate' },
      { status: 500 }
    )
  }
}
