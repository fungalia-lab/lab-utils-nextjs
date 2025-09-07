import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { durableItemUpdateSchema } from '@/lib/schemas'

// GET /api/durable-items/[id] - Get a specific durable item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const durableItem = await prisma.durableItem.findUnique({
      where: { id },
    })
    
    if (!durableItem) {
      return NextResponse.json(
        { error: 'Durable item not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(durableItem)
  } catch (error) {
    console.error('Error fetching durable item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch durable item' },
      { status: 500 }
    )
  }
}

// PUT /api/durable-items/[id] - Update a durable item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = durableItemUpdateSchema.parse(body)
    
    const durableItem = await prisma.durableItem.update({
      where: { id },
      data: validatedData,
    })
    
    return NextResponse.json(durableItem)
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }
    
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Durable item not found' },
        { status: 404 }
      )
    }
    
    console.error('Error updating durable item:', error)
    return NextResponse.json(
      { error: 'Failed to update durable item' },
      { status: 500 }
    )
  }
}

// DELETE /api/durable-items/[id] - Delete a durable item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.durableItem.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Durable item deleted successfully' })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Durable item not found' },
        { status: 404 }
      )
    }
    
    console.error('Error deleting durable item:', error)
    return NextResponse.json(
      { error: 'Failed to delete durable item' },
      { status: 500 }
    )
  }
}
