import { z } from 'zod'

// Strain schemas
export const strainCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  species: z.string().min(1, 'Species is required'),
  description: z.string().optional(),
  origin: z.string().optional(),
  characteristics: z.string().default('[]'), // JSON string
})

export const strainUpdateSchema = strainCreateSchema.partial()

// Culture Type schemas
export const cultureTypeCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  medium: z.string().optional(),
  temperature: z.number().optional(),
  humidity: z.number().optional(),
  ph: z.number().optional(),
})

export const cultureTypeUpdateSchema = cultureTypeCreateSchema.partial()

// Grow Parameter schemas
export const growParameterCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  unit: z.string().min(1, 'Unit is required'),
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
  optimalValue: z.number().optional(),
  description: z.string().optional(),
})

export const growParameterUpdateSchema = growParameterCreateSchema.partial()

// Substrate schemas
export const substrateCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  composition: z.string().optional(),
  ph: z.number().optional(),
  nutrients: z.string().default('[]'), // JSON string
  description: z.string().optional(),
})

export const substrateUpdateSchema = substrateCreateSchema.partial()

// Consumable Item schemas
export const consumableItemCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  unit: z.string().min(1, 'Unit is required'),
  supplier: z.string().optional(),
  catalogNumber: z.string().optional(),
  description: z.string().optional(),
})

export const consumableItemUpdateSchema = consumableItemCreateSchema.partial()

// Durable Item schemas
export const durableItemCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
})

export const durableItemUpdateSchema = durableItemCreateSchema.partial()

// Protocol schemas
export const protocolCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  steps: z.string().default('[]'), // JSON string
  duration: z.number().optional(),
  temperature: z.number().optional(),
  equipment: z.string().default('[]'), // JSON string
  materials: z.string().default('[]'), // JSON string
  description: z.string().optional(),
})

export const protocolUpdateSchema = protocolCreateSchema.partial()
