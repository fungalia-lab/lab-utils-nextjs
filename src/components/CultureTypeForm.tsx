'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

interface CultureTypeFormProps {
  initialData?: {
    name: string
    description: string
    medium: string
    temperature?: number
    humidity?: number
    ph?: number
  }
  onSubmit: (data: any) => void
}

export default function CultureTypeForm({ initialData, onSubmit }: CultureTypeFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    medium: initialData?.medium || '',
    temperature: initialData?.temperature || '',
    humidity: initialData?.humidity || '',
    ph: initialData?.ph || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const data = {
      name: formData.name,
      description: formData.description || undefined,
      medium: formData.medium || undefined,
      temperature: formData.temperature ? parseFloat(formData.temperature.toString()) : undefined,
      humidity: formData.humidity ? parseFloat(formData.humidity.toString()) : undefined,
      ph: formData.ph ? parseFloat(formData.ph.toString()) : undefined,
    }
    
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nome *
        </label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ex: Cultura de Pleurotus"
          required
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
          placeholder="Descrição detalhada do tipo de cultura..."
          rows={3}
        />
      </div>

      <div>
        <label htmlFor="medium" className="block text-sm font-medium text-gray-700 mb-2">
          Meio de Cultura
        </label>
        <Input
          id="medium"
          value={formData.medium}
          onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
          placeholder="Ex: PDA, MEA, Sabouraud"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-2">
            Temperatura Ideal (°C)
          </label>
          <Input
            id="temperature"
            type="number"
            step="0.1"
            value={formData.temperature}
            onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
            placeholder="Ex: 25"
          />
        </div>

        <div>
          <label htmlFor="humidity" className="block text-sm font-medium text-gray-700 mb-2">
            Umidade Ideal (%)
          </label>
          <Input
            id="humidity"
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={formData.humidity}
            onChange={(e) => setFormData({ ...formData, humidity: e.target.value })}
            placeholder="Ex: 80"
          />
        </div>

        <div>
          <label htmlFor="ph" className="block text-sm font-medium text-gray-700 mb-2">
            pH Ideal
          </label>
          <Input
            id="ph"
            type="number"
            step="0.1"
            min="0"
            max="14"
            value={formData.ph}
            onChange={(e) => setFormData({ ...formData, ph: e.target.value })}
            placeholder="Ex: 6.5"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="submit">
          {initialData ? 'Atualizar' : 'Criar'} Tipo de Cultura
        </Button>
      </div>
    </form>
  )
}
