import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cultureTypeCreateSchema } from '@/lib/schemas'

// GET /api/culture-types - List all culture types
export async function GET() {
  try {
    const cultureTypes = await prisma.cultureType.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(cultureTypes)
  } catch (error) {
    console.error('Error fetching culture types:', error)
    return NextResponse.json(
      { error: 'Failed to fetch culture types' },
      { status: 500 }
    )
  }
}

// POST /api/culture-types - Create a new culture type
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = cultureTypeCreateSchema.parse(body)
    
    const cultureType = await prisma.cultureType.create({
      data: validatedData,
    })
    
    return NextResponse.json(cultureType, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }
    
    console.error('Error creating culture type:', error)
    return NextResponse.json(
      { error: 'Failed to create culture type' },
      { status: 500 }
    )
  }
}
