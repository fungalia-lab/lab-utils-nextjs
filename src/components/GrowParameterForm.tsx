'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

interface GrowParameterFormProps {
  initialData?: {
    name: string
    type: string
    unit: string
    minValue?: number
    maxValue?: number
    optimalValue?: number
    description: string
  }
  onSubmit: (data: any) => void
}

export default function GrowParameterForm({ initialData, onSubmit }: GrowParameterFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || '',
    unit: initialData?.unit || '',
    minValue: initialData?.minValue || '',
    maxValue: initialData?.maxValue || '',
    optimalValue: initialData?.optimalValue || '',
    description: initialData?.description || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const data = {
      name: formData.name,
      type: formData.type,
      unit: formData.unit,
      minValue: formData.minValue ? parseFloat(formData.minValue.toString()) : undefined,
      maxValue: formData.maxValue ? parseFloat(formData.maxValue.toString()) : undefined,
      optimalValue: formData.optimalValue ? parseFloat(formData.optimalValue.toString()) : undefined,
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
            placeholder="Ex: Temperatura de Crescimento"
            required
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
            Tipo *
          </label>
          <Input
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            placeholder="Ex: temperatura, umidade, ph, luz"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
          Unidade *
        </label>
        <Input
          id="unit"
          value={formData.unit}
          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          placeholder="Ex: °C, %, lux, mg/L"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="minValue" className="block text-sm font-medium text-gray-700 mb-2">
            Valor Mínimo
          </label>
          <Input
            id="minValue"
            type="number"
            step="0.1"
            value={formData.minValue}
            onChange={(e) => setFormData({ ...formData, minValue: e.target.value })}
            placeholder="Ex: 20"
          />
        </div>

        <div>
          <label htmlFor="optimalValue" className="block text-sm font-medium text-gray-700 mb-2">
            Valor Ótimo
          </label>
          <Input
            id="optimalValue"
            type="number"
            step="0.1"
            value={formData.optimalValue}
            onChange={(e) => setFormData({ ...formData, optimalValue: e.target.value })}
            placeholder="Ex: 25"
          />
        </div>

        <div>
          <label htmlFor="maxValue" className="block text-sm font-medium text-gray-700 mb-2">
            Valor Máximo
          </label>
          <Input
            id="maxValue"
            type="number"
            step="0.1"
            value={formData.maxValue}
            onChange={(e) => setFormData({ ...formData, maxValue: e.target.value })}
            placeholder="Ex: 30"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Descrição
        </label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descrição detalhada do parâmetro..."
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="submit">
          {initialData ? 'Atualizar' : 'Criar'} Parâmetro
        </Button>
      </div>
    </form>
  )
}
