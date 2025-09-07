import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { durableItemCreateSchema } from '@/lib/schemas'

// GET /api/durable-items - List all durable items
export async function GET() {
  try {
    const durableItems = await prisma.durableItem.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(durableItems)
  } catch (error) {
    console.error('Error fetching durable items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch durable items' },
      { status: 500 }
    )
  }
}

// POST /api/durable-items - Create a new durable item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = durableItemCreateSchema.parse(body)
    
    const durableItem = await prisma.durableItem.create({
      data: validatedData,
    })
    
    return NextResponse.json(durableItem, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }
    
    console.error('Error creating durable item:', error)
    return NextResponse.json(
      { error: 'Failed to create durable item' },
      { status: 500 }
    )
  }
}
