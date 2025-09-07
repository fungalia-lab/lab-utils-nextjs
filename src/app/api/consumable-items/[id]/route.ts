import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { consumableItemUpdateSchema } from '@/lib/schemas'

// GET /api/consumable-items/[id] - Get a specific consumable item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const consumableItem = await prisma.consumableItem.findUnique({
      where: { id },
    })
    
    if (!consumableItem) {
      return NextResponse.json(
        { error: 'Consumable item not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(consumableItem)
  } catch (error) {
    console.error('Error fetching consumable item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch consumable item' },
      { status: 500 }
    )
  }
}

// PUT /api/consumable-items/[id] - Update a consumable item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = consumableItemUpdateSchema.parse(body)
    
    const consumableItem = await prisma.consumableItem.update({
      where: { id },
      data: validatedData,
    })
    
    return NextResponse.json(consumableItem)
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }
    
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Consumable item not found' },
        { status: 404 }
      )
    }
    
    console.error('Error updating consumable item:', error)
    return NextResponse.json(
      { error: 'Failed to update consumable item' },
      { status: 500 }
    )
  }
}

// DELETE /api/consumable-items/[id] - Delete a consumable item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.consumableItem.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Consumable item deleted successfully' })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Consumable item not found' },
        { status: 404 }
      )
    }
    
    console.error('Error deleting consumable item:', error)
    return NextResponse.json(
      { error: 'Failed to delete consumable item' },
      { status: 500 }
    )
  }
}
