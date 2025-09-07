'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

interface ProtocolFormProps {
  initialData?: {
    name: string
    type: string
    steps: string
    duration?: number
    temperature?: number
    equipment: string
    materials: string
    description: string
  }
  onSubmit: (data: any) => void
}

export default function ProtocolForm({ initialData, onSubmit }: ProtocolFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || '',
    duration: initialData?.duration || '',
    temperature: initialData?.temperature || '',
    description: initialData?.description || '',
  })

  const [steps, setSteps] = useState<string[]>(() => {
    try {
      return initialData?.steps ? JSON.parse(initialData.steps) : []
    } catch {
      return []
    }
  })

  const [equipment, setEquipment] = useState<string[]>(() => {
    try {
      return initialData?.equipment ? JSON.parse(initialData.equipment) : []
    } catch {
      return []
    }
  })

  const [materials, setMaterials] = useState<string[]>(() => {
    try {
      return initialData?.materials ? JSON.parse(initialData.materials) : []
    } catch {
      return []
    }
  })

  const [newStep, setNewStep] = useState('')
  const [newEquipment, setNewEquipment] = useState('')
  const [newMaterial, setNewMaterial] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const data = {
      name: formData.name,
      type: formData.type,
      steps: JSON.stringify(steps),
      duration: formData.duration ? parseInt(formData.duration.toString()) : undefined,
      temperature: formData.temperature ? parseFloat(formData.temperature.toString()) : undefined,
      equipment: JSON.stringify(equipment),
      materials: JSON.stringify(materials),
      description: formData.description || undefined,
    }
    
    onSubmit(data)
  }

  const addStep = () => {
    if (newStep.trim() && !steps.includes(newStep.trim())) {
      setSteps([...steps, newStep.trim()])
      setNewStep('')
    }
  }

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index))
  }

  const addEquipment = () => {
    if (newEquipment.trim() && !equipment.includes(newEquipment.trim())) {
      setEquipment([...equipment, newEquipment.trim()])
      setNewEquipment('')
    }
  }

  const removeEquipment = (index: number) => {
    setEquipment(equipment.filter((_, i) => i !== index))
  }

  const addMaterial = () => {
    if (newMaterial.trim() && !materials.includes(newMaterial.trim())) {
      setMaterials([...materials, newMaterial.trim()])
      setNewMaterial('')
    }
  }

  const removeMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index))
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
            placeholder="Ex: Inoculação de Substrato"
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
            placeholder="Ex: inoculação, transferência, análise"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
            Duração (minutos)
          </label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="Ex: 30"
          />
        </div>

        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-2">
            Temperatura (°C)
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Passos do Protocolo
        </label>
        <div className="space-y-3">
          <div className="flex space-x-2">
            <Input
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              placeholder="Ex: Preparar substrato esterilizado"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStep())}
            />
            <Button type="button" onClick={addStep} variant="outline">
              Adicionar
            </Button>
          </div>
          
          {steps.length > 0 && (
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm">{index + 1}. {step}</span>
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Equipamentos Necessários
        </label>
        <div className="space-y-3">
          <div className="flex space-x-2">
            <Input
              value={newEquipment}
              onChange={(e) => setNewEquipment(e.target.value)}
              placeholder="Ex: autoclave, microscópio"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEquipment())}
            />
            <Button type="button" onClick={addEquipment} variant="outline">
              Adicionar
            </Button>
          </div>
          
          {equipment.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {equipment.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeEquipment(index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Materiais Necessários
        </label>
        <div className="space-y-3">
          <div className="flex space-x-2">
            <Input
              value={newMaterial}
              onChange={(e) => setNewMaterial(e.target.value)}
              placeholder="Ex: substrato, inóculo"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
            />
            <Button type="button" onClick={addMaterial} variant="outline">
              Adicionar
            </Button>
          </div>
          
          {materials.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {materials.map((material, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700"
                >
                  {material}
                  <button
                    type="button"
                    onClick={() => removeMaterial(index)}
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
          placeholder="Descrição detalhada do protocolo..."
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="submit">
          {initialData ? 'Atualizar' : 'Criar'} Protocolo
        </Button>
      </div>
    </form>
  )
}
