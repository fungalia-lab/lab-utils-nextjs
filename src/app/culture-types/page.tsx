'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import CultureTypeForm from '@/components/CultureTypeForm'

interface CultureType {
  id: string
  name: string
  description?: string
  medium?: string
  temperature?: number
  humidity?: number
  ph?: number
  createdAt: string
  updatedAt: string
}

export default function CultureTypesPage() {
  const [cultureTypes, setCultureTypes] = useState<CultureType[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCultureType, setSelectedCultureType] = useState<CultureType | null>(null)

  const fetchCultureTypes = async () => {
    try {
      const response = await fetch('/api/culture-types')
      const data = await response.json()
      setCultureTypes(data)
    } catch (error) {
      console.error('Error fetching culture types:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCultureTypes()
  }, [])

  const handleCreate = async (cultureTypeData: any) => {
    try {
      const response = await fetch('/api/culture-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cultureTypeData),
      })
      
      if (response.ok) {
        await fetchCultureTypes()
        setIsCreateModalOpen(false)
      }
    } catch (error) {
      console.error('Error creating culture type:', error)
    }
  }

  const handleUpdate = async (cultureTypeData: any) => {
    if (!selectedCultureType) return
    
    try {
      const response = await fetch(`/api/culture-types/${selectedCultureType.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cultureTypeData),
      })
      
      if (response.ok) {
        await fetchCultureTypes()
        setIsEditModalOpen(false)
        setSelectedCultureType(null)
      }
    } catch (error) {
      console.error('Error updating culture type:', error)
    }
  }

  const handleDelete = async () => {
    if (!selectedCultureType) return
    
    try {
      const response = await fetch(`/api/culture-types/${selectedCultureType.id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        await fetchCultureTypes()
        setIsDeleteModalOpen(false)
        setSelectedCultureType(null)
      }
    } catch (error) {
      console.error('Error deleting culture type:', error)
    }
  }

  const openEditModal = (cultureType: CultureType) => {
    setSelectedCultureType(cultureType)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (cultureType: CultureType) => {
    setSelectedCultureType(cultureType)
    setIsDeleteModalOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando tipos de cultura...</p>
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
                <span className="mr-3">🧪</span>
                Culture Types
              </h1>
              <p className="text-gray-600">
                Gerencie os tipos de cultura do laboratório
              </p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              + Novo Tipo de Cultura
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Tipos</CardTitle>
              <span className="text-2xl">🧪</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cultureTypes.length}</div>
              <p className="text-xs text-gray-500">Tipos cadastrados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Com Meio Definido</CardTitle>
              <span className="text-2xl">🥽</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {cultureTypes.filter(ct => ct.medium).length}
              </div>
              <p className="text-xs text-gray-500">Com meio de cultura</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperatura Média</CardTitle>
              <span className="text-2xl">🌡️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {cultureTypes.filter(ct => ct.temperature).length > 0
                  ? Math.round(cultureTypes.filter(ct => ct.temperature).reduce((acc, ct) => acc + (ct.temperature || 0), 0) / cultureTypes.filter(ct => ct.temperature).length)
                  : 'N/A'
                }°C
              </div>
              <p className="text-xs text-gray-500">Temperatura ideal</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
              <span className="text-2xl">⏰</span>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold">
                {cultureTypes.length > 0 
                  ? new Date(Math.max(...cultureTypes.map(ct => new Date(ct.updatedAt).getTime()))).toLocaleDateString('pt-BR')
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
            <CardTitle>Lista de Tipos de Cultura</CardTitle>
            <CardDescription>
              Todos os tipos de cultura cadastrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {cultureTypes.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-6xl mb-4 block">🧪</span>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum tipo de cultura cadastrado</h3>
                <p className="text-gray-500 mb-4">Comece adicionando seu primeiro tipo de cultura</p>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  + Adicionar Primeiro Tipo
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Meio</TableHead>
                    <TableHead>Temperatura</TableHead>
                    <TableHead>Umidade</TableHead>
                    <TableHead>pH</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cultureTypes.map((cultureType) => (
                    <TableRow key={cultureType.id}>
                      <TableCell className="font-medium">{cultureType.name}</TableCell>
                      <TableCell>{cultureType.medium || '-'}</TableCell>
                      <TableCell>{cultureType.temperature ? `${cultureType.temperature}°C` : '-'}</TableCell>
                      <TableCell>{cultureType.humidity ? `${cultureType.humidity}%` : '-'}</TableCell>
                      <TableCell>{cultureType.ph || '-'}</TableCell>
                      <TableCell>
                        {new Date(cultureType.createdAt).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(cultureType)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => openDeleteModal(cultureType)}
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
          title="Novo Tipo de Cultura"
        >
          <CultureTypeForm onSubmit={handleCreate} />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedCultureType(null)
          }}
          title="Editar Tipo de Cultura"
        >
          {selectedCultureType && (
            <CultureTypeForm
              initialData={{
                name: selectedCultureType.name,
                description: selectedCultureType.description || '',
                medium: selectedCultureType.medium || '',
                temperature: selectedCultureType.temperature || undefined,
                humidity: selectedCultureType.humidity || undefined,
                ph: selectedCultureType.ph || undefined,
              }}
              onSubmit={handleUpdate}
            />
          )}
        </Modal>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setSelectedCultureType(null)
          }}
          title="Confirmar Exclusão"
          onConfirm={handleDelete}
          confirmText="Excluir"
          confirmVariant="danger"
        >
          <p className="text-gray-600">
            Tem certeza que deseja excluir o tipo de cultura <strong>{selectedCultureType?.name}</strong>?
            Esta ação não pode ser desfeita.
          </p>
        </Modal>
      </div>
    </div>
  )
}
