'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import SubstrateForm from '@/components/SubstrateForm'

interface Substrate {
  id: string
  name: string
  type: string
  composition?: string
  ph?: number
  nutrients: string
  description?: string
  createdAt: string
  updatedAt: string
}

export default function SubstratesPage() {
  const [substrates, setSubstrates] = useState<Substrate[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedSubstrate, setSelectedSubstrate] = useState<Substrate | null>(null)

  const fetchSubstrates = async () => {
    try {
      const response = await fetch('/api/substrates')
      const data = await response.json()
      setSubstrates(data)
    } catch (error) {
      console.error('Error fetching substrates:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubstrates()
  }, [])

  const handleCreate = async (substrateData: any) => {
    try {
      const response = await fetch('/api/substrates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(substrateData),
      })
      
      if (response.ok) {
        await fetchSubstrates()
        setIsCreateModalOpen(false)
      }
    } catch (error) {
      console.error('Error creating substrate:', error)
    }
  }

  const handleUpdate = async (substrateData: any) => {
    if (!selectedSubstrate) return
    
    try {
      const response = await fetch(`/api/substrates/${selectedSubstrate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(substrateData),
      })
      
      if (response.ok) {
        await fetchSubstrates()
        setIsEditModalOpen(false)
        setSelectedSubstrate(null)
      }
    } catch (error) {
      console.error('Error updating substrate:', error)
    }
  }

  const handleDelete = async () => {
    if (!selectedSubstrate) return
    
    try {
      const response = await fetch(`/api/substrates/${selectedSubstrate.id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        await fetchSubstrates()
        setIsDeleteModalOpen(false)
        setSelectedSubstrate(null)
      }
    } catch (error) {
      console.error('Error deleting substrate:', error)
    }
  }

  const openEditModal = (substrate: Substrate) => {
    setSelectedSubstrate(substrate)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (substrate: Substrate) => {
    setSelectedSubstrate(substrate)
    setIsDeleteModalOpen(true)
  }

  const parseNutrients = (nutrients: string) => {
    try {
      return JSON.parse(nutrients)
    } catch {
      return []
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando substratos...</p>
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
                <span className="mr-3">🌱</span>
                Substrates
              </h1>
              <p className="text-gray-600">
                Gerencie os substratos do laboratório
              </p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              + Novo Substrato
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Substratos</CardTitle>
              <span className="text-2xl">🌱</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{substrates.length}</div>
              <p className="text-xs text-gray-500">Substratos cadastrados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tipos Únicos</CardTitle>
              <span className="text-2xl">🏷️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(substrates.map(s => s.type)).size}
              </div>
              <p className="text-xs text-gray-500">Tipos diferentes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Com pH Definido</CardTitle>
              <span className="text-2xl">🧪</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {substrates.filter(s => s.ph).length}
              </div>
              <p className="text-xs text-gray-500">Com pH definido</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
              <span className="text-2xl">⏰</span>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold">
                {substrates.length > 0 
                  ? new Date(Math.max(...substrates.map(s => new Date(s.updatedAt).getTime()))).toLocaleDateString('pt-BR')
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
            <CardTitle>Lista de Substratos</CardTitle>
            <CardDescription>
              Todos os substratos cadastrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {substrates.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-6xl mb-4 block">🌱</span>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum substrato cadastrado</h3>
                <p className="text-gray-500 mb-4">Comece adicionando seu primeiro substrato</p>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  + Adicionar Primeiro Substrato
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Composição</TableHead>
                    <TableHead>pH</TableHead>
                    <TableHead>Nutrientes</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {substrates.map((substrate) => (
                    <TableRow key={substrate.id}>
                      <TableCell className="font-medium">{substrate.name}</TableCell>
                      <TableCell>
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                          {substrate.type}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {substrate.composition || '-'}
                      </TableCell>
                      <TableCell>{substrate.ph || '-'}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {parseNutrients(substrate.nutrients).map((nutrient: string, index: number) => (
                            <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              {nutrient}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(substrate.createdAt).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(substrate)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => openDeleteModal(substrate)}
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
          title="Novo Substrato"
        >
          <SubstrateForm onSubmit={handleCreate} />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedSubstrate(null)
          }}
          title="Editar Substrato"
        >
          {selectedSubstrate && (
            <SubstrateForm
              initialData={{
                name: selectedSubstrate.name,
                type: selectedSubstrate.type,
                composition: selectedSubstrate.composition || '',
                ph: selectedSubstrate.ph || undefined,
                nutrients: selectedSubstrate.nutrients,
                description: selectedSubstrate.description || '',
              }}
              onSubmit={handleUpdate}
            />
          )}
        </Modal>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setSelectedSubstrate(null)
          }}
          title="Confirmar Exclusão"
          onConfirm={handleDelete}
          confirmText="Excluir"
          confirmVariant="danger"
        >
          <p className="text-gray-600">
            Tem certeza que deseja excluir o substrato <strong>{selectedSubstrate?.name}</strong>?
            Esta ação não pode ser desfeita.
          </p>
        </Modal>
      </div>
    </div>
  )
}
