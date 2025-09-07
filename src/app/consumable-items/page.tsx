'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import ConsumableItemForm from '@/components/ConsumableItemForm'

interface ConsumableItem {
  id: string
  name: string
  category: string
  unit: string
  supplier?: string
  catalogNumber?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export default function ConsumableItemsPage() {
  const [consumableItems, setConsumableItems] = useState<ConsumableItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedConsumableItem, setSelectedConsumableItem] = useState<ConsumableItem | null>(null)

  const fetchConsumableItems = async () => {
    try {
      const response = await fetch('/api/consumable-items')
      const data = await response.json()
      setConsumableItems(data)
    } catch (error) {
      console.error('Error fetching consumable items:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConsumableItems()
  }, [])

  const handleCreate = async (consumableItemData: any) => {
    try {
      const response = await fetch('/api/consumable-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consumableItemData),
      })
      
      if (response.ok) {
        await fetchConsumableItems()
        setIsCreateModalOpen(false)
      }
    } catch (error) {
      console.error('Error creating consumable item:', error)
    }
  }

  const handleUpdate = async (consumableItemData: any) => {
    if (!selectedConsumableItem) return
    
    try {
      const response = await fetch(`/api/consumable-items/${selectedConsumableItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consumableItemData),
      })
      
      if (response.ok) {
        await fetchConsumableItems()
        setIsEditModalOpen(false)
        setSelectedConsumableItem(null)
      }
    } catch (error) {
      console.error('Error updating consumable item:', error)
    }
  }

  const handleDelete = async () => {
    if (!selectedConsumableItem) return
    
    try {
      const response = await fetch(`/api/consumable-items/${selectedConsumableItem.id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        await fetchConsumableItems()
        setIsDeleteModalOpen(false)
        setSelectedConsumableItem(null)
      }
    } catch (error) {
      console.error('Error deleting consumable item:', error)
    }
  }

  const openEditModal = (consumableItem: ConsumableItem) => {
    setSelectedConsumableItem(consumableItem)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (consumableItem: ConsumableItem) => {
    setSelectedConsumableItem(consumableItem)
    setIsDeleteModalOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando itens consumíveis...</p>
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
                <span className="mr-3">📦</span>
                Consumable Items
              </h1>
              <p className="text-gray-600">
                Gerencie os itens consumíveis do laboratório
              </p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              + Novo Item Consumível
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Itens</CardTitle>
              <span className="text-2xl">📦</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{consumableItems.length}</div>
              <p className="text-xs text-gray-500">Itens cadastrados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorias</CardTitle>
              <span className="text-2xl">🏷️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(consumableItems.map(ci => ci.category)).size}
              </div>
              <p className="text-xs text-gray-500">Categorias diferentes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Com Fornecedor</CardTitle>
              <span className="text-2xl">🏢</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {consumableItems.filter(ci => ci.supplier).length}
              </div>
              <p className="text-xs text-gray-500">Com fornecedor</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
              <span className="text-2xl">⏰</span>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold">
                {consumableItems.length > 0 
                  ? new Date(Math.max(...consumableItems.map(ci => new Date(ci.updatedAt).getTime()))).toLocaleDateString('pt-BR')
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
            <CardTitle>Lista de Itens Consumíveis</CardTitle>
            <CardDescription>
              Todos os itens consumíveis cadastrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {consumableItems.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-6xl mb-4 block">📦</span>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum item consumível cadastrado</h3>
                <p className="text-gray-500 mb-4">Comece adicionando seu primeiro item consumível</p>
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
                    <TableHead>Unidade</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Número Catálogo</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consumableItems.map((consumableItem) => (
                    <TableRow key={consumableItem.id}>
                      <TableCell className="font-medium">{consumableItem.name}</TableCell>
                      <TableCell>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          {consumableItem.category}
                        </span>
                      </TableCell>
                      <TableCell>{consumableItem.unit}</TableCell>
                      <TableCell>{consumableItem.supplier || '-'}</TableCell>
                      <TableCell>{consumableItem.catalogNumber || '-'}</TableCell>
                      <TableCell>
                        {new Date(consumableItem.createdAt).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(consumableItem)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => openDeleteModal(consumableItem)}
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
          title="Novo Item Consumível"
        >
          <ConsumableItemForm onSubmit={handleCreate} />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedConsumableItem(null)
          }}
          title="Editar Item Consumível"
        >
          {selectedConsumableItem && (
            <ConsumableItemForm
              initialData={{
                name: selectedConsumableItem.name,
                category: selectedConsumableItem.category,
                unit: selectedConsumableItem.unit,
                supplier: selectedConsumableItem.supplier || '',
                catalogNumber: selectedConsumableItem.catalogNumber || '',
                description: selectedConsumableItem.description || '',
              }}
              onSubmit={handleUpdate}
            />
          )}
        </Modal>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setSelectedConsumableItem(null)
          }}
          title="Confirmar Exclusão"
          onConfirm={handleDelete}
          confirmText="Excluir"
          confirmVariant="danger"
        >
          <p className="text-gray-600">
            Tem certeza que deseja excluir o item <strong>{selectedConsumableItem?.name}</strong>?
            Esta ação não pode ser desfeita.
          </p>
        </Modal>
      </div>
    </div>
  )
}
