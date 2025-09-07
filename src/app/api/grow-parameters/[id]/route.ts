import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { growParameterUpdateSchema } from '@/lib/schemas'

// GET /api/grow-parameters/[id] - Get a specific grow parameter
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const growParameter = await prisma.growParameter.findUnique({
      where: { id },
    })
    
    if (!growParameter) {
      return NextResponse.json(
        { error: 'Grow parameter not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(growParameter)
  } catch (error) {
    console.error('Error fetching grow parameter:', error)
    return NextResponse.json(
      { error: 'Failed to fetch grow parameter' },
      { status: 500 }
    )
  }
}

// PUT /api/grow-parameters/[id] - Update a grow parameter
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = growParameterUpdateSchema.parse(body)
    
    const growParameter = await prisma.growParameter.update({
      where: { id },
      data: validatedData,
    })
    
    return NextResponse.json(growParameter)
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }
    
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Grow parameter not found' },
        { status: 404 }
      )
    }
    
    console.error('Error updating grow parameter:', error)
    return NextResponse.json(
      { error: 'Failed to update grow parameter' },
      { status: 500 }
    )
  }
}

// DELETE /api/grow-parameters/[id] - Delete a grow parameter
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.growParameter.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Grow parameter deleted successfully' })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Grow parameter not found' },
        { status: 404 }
      )
    }
    
    console.error('Error deleting grow parameter:', error)
    return NextResponse.json(
      { error: 'Failed to delete grow parameter' },
      { status: 500 }
    )
  }
}
