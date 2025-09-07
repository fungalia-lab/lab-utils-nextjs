import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cultureTypeUpdateSchema } from '@/lib/schemas'

// GET /api/culture-types/[id] - Get a specific culture type
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cultureType = await prisma.cultureType.findUnique({
      where: { id },
    })
    
    if (!cultureType) {
      return NextResponse.json(
        { error: 'Culture type not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(cultureType)
  } catch (error) {
    console.error('Error fetching culture type:', error)
    return NextResponse.json(
      { error: 'Failed to fetch culture type' },
      { status: 500 }
    )
  }
}

// PUT /api/culture-types/[id] - Update a culture type
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = cultureTypeUpdateSchema.parse(body)
    
    const cultureType = await prisma.cultureType.update({
      where: { id },
      data: validatedData,
    })
    
    return NextResponse.json(cultureType)
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }
    
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Culture type not found' },
        { status: 404 }
      )
    }
    
    console.error('Error updating culture type:', error)
    return NextResponse.json(
      { error: 'Failed to update culture type' },
      { status: 500 }
    )
  }
}

// DELETE /api/culture-types/[id] - Delete a culture type
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.cultureType.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Culture type deleted successfully' })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Culture type not found' },
        { status: 404 }
      )
    }
    
    console.error('Error deleting culture type:', error)
    return NextResponse.json(
      { error: 'Failed to delete culture type' },
      { status: 500 }
    )
  }
}
