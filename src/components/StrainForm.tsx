'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

interface StrainFormProps {
  initialData?: {
    name: string
    species: string
    description: string
    origin: string
    characteristics: string
  }
  onSubmit: (data: any) => void
}

export default function StrainForm({ initialData, onSubmit }: StrainFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    species: initialData?.species || '',
    description: initialData?.description || '',
    origin: initialData?.origin || '',
    characteristics: initialData?.characteristics || '[]',
  })

  const [characteristics, setCharacteristics] = useState<string[]>(() => {
    try {
      return initialData?.characteristics ? JSON.parse(initialData.characteristics) : []
    } catch {
      return []
    }
  })

  const [newCharacteristic, setNewCharacteristic] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const data = {
      ...formData,
      characteristics: JSON.stringify(characteristics),
    }
    
    onSubmit(data)
  }

  const addCharacteristic = () => {
    if (newCharacteristic.trim() && !characteristics.includes(newCharacteristic.trim())) {
      setCharacteristics([...characteristics, newCharacteristic.trim()])
      setNewCharacteristic('')
    }
  }

  const removeCharacteristic = (index: number) => {
    setCharacteristics(characteristics.filter((_, i) => i !== index))
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
            placeholder="Ex: Pleurotus ostreatus"
            required
          />
        </div>

        <div>
          <label htmlFor="species" className="block text-sm font-medium text-gray-700 mb-2">
            Espécie *
          </label>
          <Input
            id="species"
            value={formData.species}
            onChange={(e) => setFormData({ ...formData, species: e.target.value })}
            placeholder="Ex: Pleurotus ostreatus"
            required
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
          placeholder="Descrição detalhada da cepa..."
          rows={3}
        />
      </div>

      <div>
        <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
          Origem
        </label>
        <Input
          id="origin"
          value={formData.origin}
          onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
          placeholder="Ex: Brasil, Amazônia"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Características
        </label>
        <div className="space-y-3">
          <div className="flex space-x-2">
            <Input
              value={newCharacteristic}
              onChange={(e) => setNewCharacteristic(e.target.value)}
              placeholder="Ex: comestível, cultivável"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCharacteristic())}
            />
            <Button type="button" onClick={addCharacteristic} variant="outline">
              Adicionar
            </Button>
          </div>
          
          {characteristics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {characteristics.map((char, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700"
                >
                  {char}
                  <button
                    type="button"
                    onClick={() => removeCharacteristic(index)}
                    className="ml-2 text-emerald-600 hover:text-emerald-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="submit">
          {initialData ? 'Atualizar' : 'Criar'} Cepa
        </Button>
      </div>
    </form>
  )
}
