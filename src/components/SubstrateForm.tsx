'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

interface SubstrateFormProps {
  initialData?: {
    name: string
    type: string
    composition: string
    ph?: number
    nutrients: string
    description: string
  }
  onSubmit: (data: any) => void
}

export default function SubstrateForm({ initialData, onSubmit }: SubstrateFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || '',
    composition: initialData?.composition || '',
    ph: initialData?.ph || '',
    description: initialData?.description || '',
  })

  const [nutrients, setNutrients] = useState<string[]>(() => {
    try {
      return initialData?.nutrients ? JSON.parse(initialData.nutrients) : []
    } catch {
      return []
    }
  })

  const [newNutrient, setNewNutrient] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const data = {
      name: formData.name,
      type: formData.type,
      composition: formData.composition || undefined,
      ph: formData.ph ? parseFloat(formData.ph.toString()) : undefined,
      nutrients: JSON.stringify(nutrients),
      description: formData.description || undefined,
    }
    
    onSubmit(data)
  }

  const addNutrient = () => {
    if (newNutrient.trim() && !nutrients.includes(newNutrient.trim())) {
      setNutrients([...nutrients, newNutrient.trim()])
      setNewNutrient('')
    }
  }

  const removeNutrient = (index: number) => {
    setNutrients(nutrients.filter((_, i) => i !== index))
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
            placeholder="Ex: Serragem de Eucalipto"
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
            placeholder="Ex: orgânico, inorgânico, sintético"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="composition" className="block text-sm font-medium text-gray-700 mb-2">
          Composição Química
        </label>
        <Textarea
          id="composition"
          value={formData.composition}
          onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
          placeholder="Composição química detalhada do substrato..."
          rows={3}
        />
      </div>

      <div>
        <label htmlFor="ph" className="block text-sm font-medium text-gray-700 mb-2">
          pH
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nutrientes
        </label>
        <div className="space-y-3">
          <div className="flex space-x-2">
            <Input
              value={newNutrient}
              onChange={(e) => setNewNutrient(e.target.value)}
              placeholder="Ex: nitrogênio, fósforo, potássio"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addNutrient())}
            />
            <Button type="button" onClick={addNutrient} variant="outline">
              Adicionar
            </Button>
          </div>
          
          {nutrients.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {nutrients.map((nutrient, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700"
                >
                  {nutrient}
                  <button
                    type="button"
                    onClick={() => removeNutrient(index)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
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
          placeholder="Descrição detalhada do substrato..."
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="submit">
          {initialData ? 'Atualizar' : 'Criar'} Substrato
        </Button>
      </div>
    </form>
  )
}
