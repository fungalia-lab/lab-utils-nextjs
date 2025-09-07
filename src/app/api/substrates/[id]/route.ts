import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { substrateUpdateSchema } from '@/lib/schemas'

// GET /api/substrates/[id] - Get a specific substrate
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const substrate = await prisma.substrate.findUnique({
      where: { id },
    })
    
    if (!substrate) {
      return NextResponse.json(
        { error: 'Substrate not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(substrate)
  } catch (error) {
    console.error('Error fetching substrate:', error)
    return NextResponse.json(
      { error: 'Failed to fetch substrate' },
      { status: 500 }
    )
  }
}

// PUT /api/substrates/[id] - Update a substrate
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = substrateUpdateSchema.parse(body)
    
    const substrate = await prisma.substrate.update({
      where: { id },
      data: validatedData,
    })
    
    return NextResponse.json(substrate)
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }
    
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Substrate not found' },
        { status: 404 }
      )
    }
    
    console.error('Error updating substrate:', error)
    return NextResponse.json(
      { error: 'Failed to update substrate' },
      { status: 500 }
    )
  }
}

// DELETE /api/substrates/[id] - Delete a substrate
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.substrate.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Substrate deleted successfully' })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Substrate not found' },
        { status: 404 }
      )
    }
    
    console.error('Error deleting substrate:', error)
    return NextResponse.json(
      { error: 'Failed to delete substrate' },
      { status: 500 }
    )
  }
}
