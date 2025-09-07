import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { consumableItemCreateSchema } from '@/lib/schemas'

// GET /api/consumable-items - List all consumable items
export async function GET() {
  try {
    const consumableItems = await prisma.consumableItem.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(consumableItems)
  } catch (error) {
    console.error('Error fetching consumable items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch consumable items' },
      { status: 500 }
    )
  }
}

// POST /api/consumable-items - Create a new consumable item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = consumableItemCreateSchema.parse(body)
    
    const consumableItem = await prisma.consumableItem.create({
      data: validatedData,
    })
    
    return NextResponse.json(consumableItem, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }
    
    console.error('Error creating consumable item:', error)
    return NextResponse.json(
      { error: 'Failed to create consumable item' },
      { status: 500 }
    )
  }
}
