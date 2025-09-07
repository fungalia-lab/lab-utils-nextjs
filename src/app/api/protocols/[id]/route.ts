import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { protocolUpdateSchema } from '@/lib/schemas'

// GET /api/protocols/[id] - Get a specific protocol
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const protocol = await prisma.protocol.findUnique({
      where: { id },
    })
    
    if (!protocol) {
      return NextResponse.json(
        { error: 'Protocol not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(protocol)
  } catch (error) {
    console.error('Error fetching protocol:', error)
    return NextResponse.json(
      { error: 'Failed to fetch protocol' },
      { status: 500 }
    )
  }
}

// PUT /api/protocols/[id] - Update a protocol
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = protocolUpdateSchema.parse(body)
    
    const protocol = await prisma.protocol.update({
      where: { id },
      data: validatedData,
    })
    
    return NextResponse.json(protocol)
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }
    
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Protocol not found' },
        { status: 404 }
      )
    }
    
    console.error('Error updating protocol:', error)
    return NextResponse.json(
      { error: 'Failed to update protocol' },
      { status: 500 }
    )
  }
}

// DELETE /api/protocols/[id] - Delete a protocol
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.protocol.delete({
      where: { id },
    })
    
    return NextResponse.json({ message: 'Protocol deleted successfully' })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Protocol not found' },
        { status: 404 }
      )
    }
    
    console.error('Error deleting protocol:', error)
    return NextResponse.json(
      { error: 'Failed to delete protocol' },
      { status: 500 }
    )
  }
}
