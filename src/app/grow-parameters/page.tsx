'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import GrowParameterForm from '@/components/GrowParameterForm'

interface GrowParameter {
  id: string
  name: string
  type: string
  unit: string
  minValue?: number
  maxValue?: number
  optimalValue?: number
  description?: string
  createdAt: string
  updatedAt: string
}

export default function GrowParametersPage() {
  const [growParameters, setGrowParameters] = useState<GrowParameter[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedGrowParameter, setSelectedGrowParameter] = useState<GrowParameter | null>(null)

  const fetchGrowParameters = async () => {
    try {
      const response = await fetch('/api/grow-parameters')
      const data = await response.json()
      setGrowParameters(data)
    } catch (error) {
      console.error('Error fetching grow parameters:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGrowParameters()
  }, [])

  const handleCreate = async (growParameterData: any) => {
    try {
      const response = await fetch('/api/grow-parameters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(growParameterData),
      })
      
      if (response.ok) {
        await fetchGrowParameters()
        setIsCreateModalOpen(false)
      }
    } catch (error) {
      console.error('Error creating grow parameter:', error)
    }
  }

  const handleUpdate = async (growParameterData: any) => {
    if (!selectedGrowParameter) return
    
    try {
      const response = await fetch(`/api/grow-parameters/${selectedGrowParameter.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(growParameterData),
      })
      
      if (response.ok) {
        await fetchGrowParameters()
        setIsEditModalOpen(false)
        setSelectedGrowParameter(null)
      }
    } catch (error) {
      console.error('Error updating grow parameter:', error)
    }
  }

  const handleDelete = async () => {
    if (!selectedGrowParameter) return
    
    try {
      const response = await fetch(`/api/grow-parameters/${selectedGrowParameter.id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        await fetchGrowParameters()
        setIsDeleteModalOpen(false)
        setSelectedGrowParameter(null)
      }
    } catch (error) {
      console.error('Error deleting grow parameter:', error)
    }
  }

  const openEditModal = (growParameter: GrowParameter) => {
    setSelectedGrowParameter(growParameter)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (growParameter: GrowParameter) => {
    setSelectedGrowParameter(growParameter)
    setIsDeleteModalOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando parâmetros...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <span className="mr-3">📊</span>
                Grow Parameters
              </h1>
              <p className="text-gray-600">
                Gerencie os parâmetros de crescimento do laboratório
              </p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              + Novo Parâmetro
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Parâmetros</CardTitle>
              <span className="text-2xl">📊</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{growParameters.length}</div>
              <p className="text-xs text-gray-500">Parâmetros cadastrados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tipos Únicos</CardTitle>
              <span className="text-2xl">🏷️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(growParameters.map(gp => gp.type)).size}
              </div>
              <p className="text-xs text-gray-500">Tipos diferentes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Com Valores Ótimos</CardTitle>
              <span className="text-2xl">🎯</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {growParameters.filter(gp => gp.optimalValue).length}
              </div>
              <p className="text-xs text-gray-500">Com valor ótimo</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
              <span className="text-2xl">⏰</span>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold">
                {growParameters.length > 0 
                  ? new Date(Math.max(...growParameters.map(gp => new Date(gp.updatedAt).getTime()))).toLocaleDateString('pt-BR')
                  : 'N/A'
                }
              </div>
              <p className="text-xs text-gray-500">Mais recente</p>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Parâmetros de Crescimento</CardTitle>
            <CardDescription>
              Todos os parâmetros cadastrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {growParameters.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-6xl mb-4 block">📊</span>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum parâmetro cadastrado</h3>
                <p className="text-gray-500 mb-4">Comece adicionando seu primeiro parâmetro</p>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  + Adicionar Primeiro Parâmetro
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Unidade</TableHead>
                    <TableHead>Valor Mín</TableHead>
                    <TableHead>Valor Ótimo</TableHead>
                    <TableHead>Valor Máx</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {growParameters.map((growParameter) => (
                    <TableRow key={growParameter.id}>
                      <TableCell className="font-medium">{growParameter.name}</TableCell>
                      <TableCell>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          {growParameter.type}
                        </span>
                      </TableCell>
                      <TableCell>{growParameter.unit}</TableCell>
                      <TableCell>{growParameter.minValue || '-'}</TableCell>
                      <TableCell>
                        {growParameter.optimalValue ? (
                          <span className="font-medium text-green-600">
                            {growParameter.optimalValue}
                          </span>
                        ) : '-'}
                      </TableCell>
                      <TableCell>{growParameter.maxValue || '-'}</TableCell>
                      <TableCell>
                        {new Date(growParameter.createdAt).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(growParameter)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => openDeleteModal(growParameter)}
                          >
                            Excluir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Modals */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Novo Parâmetro de Crescimento"
        >
          <GrowParameterForm onSubmit={handleCreate} />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedGrowParameter(null)
          }}
          title="Editar Parâmetro de Crescimento"
        >
          {selectedGrowParameter && (
            <GrowParameterForm
              initialData={{
                name: selectedGrowParameter.name,
                type: selectedGrowParameter.type,
                unit: selectedGrowParameter.unit,
                minValue: selectedGrowParameter.minValue || undefined,
                maxValue: selectedGrowParameter.maxValue || undefined,
                optimalValue: selectedGrowParameter.optimalValue || undefined,
                description: selectedGrowParameter.description || '',
              }}
              onSubmit={handleUpdate}
            />
          )}
        </Modal>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setSelectedGrowParameter(null)
          }}
          title="Confirmar Exclusão"
          onConfirm={handleDelete}
          confirmText="Excluir"
          confirmVariant="danger"
        >
          <p className="text-gray-600">
            Tem certeza que deseja excluir o parâmetro <strong>{selectedGrowParameter?.name}</strong>?
            Esta ação não pode ser desfeita.
          </p>
        </Modal>
      </div>
    </div>
  )
}
