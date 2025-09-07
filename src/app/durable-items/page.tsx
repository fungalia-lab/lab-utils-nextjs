'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import DurableItemForm from '@/components/DurableItemForm'

interface DurableItem {
  id: string
  name: string
  category: string
  brand?: string
  model?: string
  serialNumber?: string
  location?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export default function DurableItemsPage() {
  const [durableItems, setDurableItems] = useState<DurableItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDurableItem, setSelectedDurableItem] = useState<DurableItem | null>(null)

  const fetchDurableItems = async () => {
    try {
      const response = await fetch('/api/durable-items')
      const data = await response.json()
      setDurableItems(data)
    } catch (error) {
      console.error('Error fetching durable items:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDurableItems()
  }, [])

  const handleCreate = async (durableItemData: any) => {
    try {
      const response = await fetch('/api/durable-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(durableItemData),
      })
      
      if (response.ok) {
        await fetchDurableItems()
        setIsCreateModalOpen(false)
      }
    } catch (error) {
      console.error('Error creating durable item:', error)
    }
  }

  const handleUpdate = async (durableItemData: any) => {
    if (!selectedDurableItem) return
    
    try {
      const response = await fetch(`/api/durable-items/${selectedDurableItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(durableItemData),
      })
      
      if (response.ok) {
        await fetchDurableItems()
        setIsEditModalOpen(false)
        setSelectedDurableItem(null)
      }
    } catch (error) {
      console.error('Error updating durable item:', error)
    }
  }

  const handleDelete = async () => {
    if (!selectedDurableItem) return
    
    try {
      const response = await fetch(`/api/durable-items/${selectedDurableItem.id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        await fetchDurableItems()
        setIsDeleteModalOpen(false)
        setSelectedDurableItem(null)
      }
    } catch (error) {
      console.error('Error deleting durable item:', error)
    }
  }

  const openEditModal = (durableItem: DurableItem) => {
    setSelectedDurableItem(durableItem)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (durableItem: DurableItem) => {
    setSelectedDurableItem(durableItem)
    setIsDeleteModalOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando itens duráveis...</p>
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
                <span className="mr-3">🔧</span>
                Durable Items
              </h1>
              <p className="text-gray-600">
                Gerencie os itens duráveis do laboratório
              </p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              + Novo Item Durável
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Itens</CardTitle>
              <span className="text-2xl">🔧</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{durableItems.length}</div>
              <p className="text-xs text-gray-500">Itens cadastrados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Marcas Únicas</CardTitle>
              <span className="text-2xl">🏷️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(durableItems.filter(di => di.brand).map(di => di.brand)).size}
              </div>
              <p className="text-xs text-gray-500">Marcas diferentes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Com Localização</CardTitle>
              <span className="text-2xl">📍</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {durableItems.filter(di => di.location).length}
              </div>
              <p className="text-xs text-gray-500">Com localização</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
              <span className="text-2xl">⏰</span>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold">
                {durableItems.length > 0 
                  ? new Date(Math.max(...durableItems.map(di => new Date(di.updatedAt).getTime()))).toLocaleDateString('pt-BR')
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
            <CardTitle>Lista de Itens Duráveis</CardTitle>
            <CardDescription>
              Todos os itens duráveis cadastrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {durableItems.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-6xl mb-4 block">🔧</span>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum item durável cadastrado</h3>
                <p className="text-gray-500 mb-4">Comece adicionando seu primeiro item durável</p>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  + Adicionar Primeiro Item
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Marca/Modelo</TableHead>
                    <TableHead>Número Série</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {durableItems.map((durableItem) => (
                    <TableRow key={durableItem.id}>
                      <TableCell className="font-medium">{durableItem.name}</TableCell>
                      <TableCell>
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                          {durableItem.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        {durableItem.brand && durableItem.model 
                          ? `${durableItem.brand} ${durableItem.model}`
                          : durableItem.brand || durableItem.model || '-'
                        }
                      </TableCell>
                      <TableCell>{durableItem.serialNumber || '-'}</TableCell>
                      <TableCell>{durableItem.location || '-'}</TableCell>
                      <TableCell>
                        {new Date(durableItem.createdAt).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(durableItem)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => openDeleteModal(durableItem)}
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
          title="Novo Item Durável"
        >
          <DurableItemForm onSubmit={handleCreate} />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedDurableItem(null)
          }}
          title="Editar Item Durável"
        >
          {selectedDurableItem && (
            <DurableItemForm
              initialData={{
                name: selectedDurableItem.name,
                category: selectedDurableItem.category,
                brand: selectedDurableItem.brand || '',
                model: selectedDurableItem.model || '',
                serialNumber: selectedDurableItem.serialNumber || '',
                location: selectedDurableItem.location || '',
                description: selectedDurableItem.description || '',
              }}
              onSubmit={handleUpdate}
            />
          )}
        </Modal>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setSelectedDurableItem(null)
          }}
          title="Confirmar Exclusão"
          onConfirm={handleDelete}
          confirmText="Excluir"
          confirmVariant="danger"
        >
          <p className="text-gray-600">
            Tem certeza que deseja excluir o item <strong>{selectedDurableItem?.name}</strong>?
            Esta ação não pode ser desfeita.
          </p>
        </Modal>
      </div>
    </div>
  )
}
