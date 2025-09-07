import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { growParameterCreateSchema } from '@/lib/schemas'

// GET /api/grow-parameters - List all grow parameters
export async function GET() {
  try {
    const growParameters = await prisma.growParameter.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(growParameters)
  } catch (error) {
    console.error('Error fetching grow parameters:', error)
    return NextResponse.json(
      { error: 'Failed to fetch grow parameters' },
      { status: 500 }
    )
  }
}

// POST /api/grow-parameters - Create a new grow parameter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = growParameterCreateSchema.parse(body)
    
    const growParameter = await prisma.growParameter.create({
      data: validatedData,
    })
    
    return NextResponse.json(growParameter, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }
    
    console.error('Error creating grow parameter:', error)
    return NextResponse.json(
      { error: 'Failed to create grow parameter' },
      { status: 500 }
    )
  }
}
