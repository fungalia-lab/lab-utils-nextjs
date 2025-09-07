'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

interface ConsumableItemFormProps {
  initialData?: {
    name: string
    category: string
    unit: string
    supplier: string
    catalogNumber: string
    description: string
  }
  onSubmit: (data: any) => void
}

export default function ConsumableItemForm({ initialData, onSubmit }: ConsumableItemFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    unit: initialData?.unit || '',
    supplier: initialData?.supplier || '',
    catalogNumber: initialData?.catalogNumber || '',
    description: initialData?.description || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const data = {
      name: formData.name,
      category: formData.category,
      unit: formData.unit,
      supplier: formData.supplier || undefined,
      catalogNumber: formData.catalogNumber || undefined,
      description: formData.description || undefined,
    }
    
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nome *
          </label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Ágar PDA"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Categoria *
          </label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="Ex: reagente, meio de cultura, equipamento descartável"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
            Unidade *
          </label>
          <Input
            id="unit"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            placeholder="Ex: ml, g, unidades"
            required
          />
        </div>

        <div>
          <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-2">
            Fornecedor
          </label>
          <Input
            id="supplier"
            value={formData.supplier}
            onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
            placeholder="Ex: Sigma-Aldrich, Merck"
          />
        </div>
      </div>

      <div>
        <label htmlFor="catalogNumber" className="block text-sm font-medium text-gray-700 mb-2">
          Número de Catálogo
        </label>
        <Input
          id="catalogNumber"
          value={formData.catalogNumber}
          onChange={(e) => setFormData({ ...formData, catalogNumber: e.target.value })}
          placeholder="Ex: P6366-500G"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Descrição
        </label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descrição detalhada do item..."
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="submit">
          {initialData ? 'Atualizar' : 'Criar'} Item
        </Button>
      </div>
    </form>
  )
}
