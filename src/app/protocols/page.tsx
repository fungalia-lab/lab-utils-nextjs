'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import ProtocolForm from '@/components/ProtocolForm'

interface Protocol {
  id: string
  name: string
  type: string
  steps: string
  duration?: number
  temperature?: number
  equipment: string
  materials: string
  description?: string
  createdAt: string
  updatedAt: string
}

export default function ProtocolsPage() {
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null)

  const fetchProtocols = async () => {
    try {
      const response = await fetch('/api/protocols')
      const data = await response.json()
      setProtocols(data)
    } catch (error) {
      console.error('Error fetching protocols:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProtocols()
  }, [])

  const handleCreate = async (protocolData: any) => {
    try {
      const response = await fetch('/api/protocols', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(protocolData),
      })
      
      if (response.ok) {
        await fetchProtocols()
        setIsCreateModalOpen(false)
      }
    } catch (error) {
      console.error('Error creating protocol:', error)
    }
  }

  const handleUpdate = async (protocolData: any) => {
    if (!selectedProtocol) return
    
    try {
      const response = await fetch(`/api/protocols/${selectedProtocol.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(protocolData),
      })
      
      if (response.ok) {
        await fetchProtocols()
        setIsEditModalOpen(false)
        setSelectedProtocol(null)
      }
    } catch (error) {
      console.error('Error updating protocol:', error)
    }
  }

  const handleDelete = async () => {
    if (!selectedProtocol) return
    
    try {
      const response = await fetch(`/api/protocols/${selectedProtocol.id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        await fetchProtocols()
        setIsDeleteModalOpen(false)
        setSelectedProtocol(null)
      }
    } catch (error) {
      console.error('Error deleting protocol:', error)
    }
  }

  const openEditModal = (protocol: Protocol) => {
    setSelectedProtocol(protocol)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (protocol: Protocol) => {
    setSelectedProtocol(protocol)
    setIsDeleteModalOpen(true)
  }

  const parseArray = (jsonString: string) => {
    try {
      return JSON.parse(jsonString)
    } catch {
      return []
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando protocolos...</p>
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
                <span className="mr-3">📋</span>
                Protocols
              </h1>
              <p className="text-gray-600">
                Gerencie os protocolos e ações do laboratório
              </p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              + Novo Protocolo
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Protocolos</CardTitle>
              <span className="text-2xl">📋</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{protocols.length}</div>
              <p className="text-xs text-gray-500">Protocolos cadastrados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tipos Únicos</CardTitle>
              <span className="text-2xl">🏷️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(protocols.map(p => p.type)).size}
              </div>
              <p className="text-xs text-gray-500">Tipos diferentes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Duração Média</CardTitle>
              <span className="text-2xl">⏱️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {protocols.filter(p => p.duration).length > 0
                  ? Math.round(protocols.filter(p => p.duration).reduce((acc, p) => acc + (p.duration || 0), 0) / protocols.filter(p => p.duration).length)
                  : 'N/A'
                }min
              </div>
              <p className="text-xs text-gray-500">Duração média</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
              <span className="text-2xl">⏰</span>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold">
                {protocols.length > 0 
                  ? new Date(Math.max(...protocols.map(p => new Date(p.updatedAt).getTime()))).toLocaleDateString('pt-BR')
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
            <CardTitle>Lista de Protocolos</CardTitle>
            <CardDescription>
              Todos os protocolos cadastrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {protocols.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-6xl mb-4 block">📋</span>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum protocolo cadastrado</h3>
                <p className="text-gray-500 mb-4">Comece adicionando seu primeiro protocolo</p>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  + Adicionar Primeiro Protocolo
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Passos</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead>Temperatura</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {protocols.map((protocol) => (
                    <TableRow key={protocol.id}>
                      <TableCell className="font-medium">{protocol.name}</TableCell>
                      <TableCell>
                        <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
                          {protocol.type}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {parseArray(protocol.steps).length} passos
                        </div>
                      </TableCell>
                      <TableCell>
                        {protocol.duration ? `${protocol.duration}min` : '-'}
                      </TableCell>
                      <TableCell>
                        {protocol.temperature ? `${protocol.temperature}°C` : '-'}
                      </TableCell>
                      <TableCell>
                        {new Date(protocol.createdAt).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(protocol)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => openDeleteModal(protocol)}
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
          title="Novo Protocolo"
        >
          <ProtocolForm onSubmit={handleCreate} />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedProtocol(null)
          }}
          title="Editar Protocolo"
        >
          {selectedProtocol && (
            <ProtocolForm
              initialData={{
                name: selectedProtocol.name,
                type: selectedProtocol.type,
                steps: selectedProtocol.steps,
                duration: selectedProtocol.duration || undefined,
                temperature: selectedProtocol.temperature || undefined,
                equipment: selectedProtocol.equipment,
                materials: selectedProtocol.materials,
                description: selectedProtocol.description || '',
              }}
              onSubmit={handleUpdate}
            />
          )}
        </Modal>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setSelectedProtocol(null)
          }}
          title="Confirmar Exclusão"
          onConfirm={handleDelete}
          confirmText="Excluir"
          confirmVariant="danger"
        >
          <p className="text-gray-600">
            Tem certeza que deseja excluir o protocolo <strong>{selectedProtocol?.name}</strong>?
            Esta ação não pode ser desfeita.
          </p>
        </Modal>
      </div>
    </div>
  )
}
