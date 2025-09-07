'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import StrainForm from '@/components/StrainForm'

interface Strain {
  id: string
  name: string
  species: string
  description?: string
  origin?: string
  characteristics: string
  createdAt: string
  updatedAt: string
}

export default function StrainsPage() {
  const [strains, setStrains] = useState<Strain[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedStrain, setSelectedStrain] = useState<Strain | null>(null)

  const fetchStrains = async () => {
    try {
      const response = await fetch('/api/strains')
      const data = await response.json()
      setStrains(data)
    } catch (error) {
      console.error('Error fetching strains:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStrains()
  }, [])

  const handleCreate = async (strainData: any) => {
    try {
      const response = await fetch('/api/strains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(strainData),
      })
      
      if (response.ok) {
        await fetchStrains()
        setIsCreateModalOpen(false)
      }
    } catch (error) {
      console.error('Error creating strain:', error)
    }
  }

  const handleUpdate = async (strainData: any) => {
    if (!selectedStrain) return
    
    try {
      const response = await fetch(`/api/strains/${selectedStrain.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(strainData),
      })
      
      if (response.ok) {
        await fetchStrains()
        setIsEditModalOpen(false)
        setSelectedStrain(null)
      }
    } catch (error) {
      console.error('Error updating strain:', error)
    }
  }

  const handleDelete = async () => {
    if (!selectedStrain) return
    
    try {
      const response = await fetch(`/api/strains/${selectedStrain.id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        await fetchStrains()
        setIsDeleteModalOpen(false)
        setSelectedStrain(null)
      }
    } catch (error) {
      console.error('Error deleting strain:', error)
    }
  }

  const openEditModal = (strain: Strain) => {
    setSelectedStrain(strain)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (strain: Strain) => {
    setSelectedStrain(strain)
    setIsDeleteModalOpen(true)
  }

  const parseCharacteristics = (characteristics: string) => {
    try {
      return JSON.parse(characteristics)
    } catch {
      return []
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando cepas...</p>
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
                <span className="mr-3">🧬</span>
                Strains
              </h1>
              <p className="text-gray-600">
                Gerencie as cepas de fungos e bactérias do laboratório
              </p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              + Nova Cepa
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Cepas</CardTitle>
              <span className="text-2xl">🧬</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{strains.length}</div>
              <p className="text-xs text-gray-500">Cepas cadastradas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Espécies Únicas</CardTitle>
              <span className="text-2xl">🔬</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(strains.map(s => s.species)).size}
              </div>
              <p className="text-xs text-gray-500">Espécies diferentes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Com Origem</CardTitle>
              <span className="text-2xl">🌍</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {strains.filter(s => s.origin).length}
              </div>
              <p className="text-xs text-gray-500">Com origem definida</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
              <span className="text-2xl">⏰</span>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold">
                {strains.length > 0 
                  ? new Date(Math.max(...strains.map(s => new Date(s.updatedAt).getTime()))).toLocaleDateString('pt-BR')
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
            <CardTitle>Lista de Cepas</CardTitle>
            <CardDescription>
              Todas as cepas cadastradas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {strains.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-6xl mb-4 block">🧬</span>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma cepa cadastrada</h3>
                <p className="text-gray-500 mb-4">Comece adicionando sua primeira cepa</p>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  + Adicionar Primeira Cepa
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Espécie</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Características</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {strains.map((strain) => (
                    <TableRow key={strain.id}>
                      <TableCell className="font-medium">{strain.name}</TableCell>
                      <TableCell>{strain.species}</TableCell>
                      <TableCell>{strain.origin || '-'}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {parseCharacteristics(strain.characteristics).map((char: string, index: number) => (
                            <span key={index} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                              {char}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(strain.createdAt).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(strain)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => openDeleteModal(strain)}
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
          title="Nova Cepa"
        >
          <StrainForm onSubmit={handleCreate} />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedStrain(null)
          }}
          title="Editar Cepa"
        >
          {selectedStrain && (
            <StrainForm
              initialData={{
                name: selectedStrain.name,
                species: selectedStrain.species,
                description: selectedStrain.description || '',
                origin: selectedStrain.origin || '',
                characteristics: selectedStrain.characteristics,
              }}
              onSubmit={handleUpdate}
            />
          )}
        </Modal>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setSelectedStrain(null)
          }}
          title="Confirmar Exclusão"
          onConfirm={handleDelete}
          confirmText="Excluir"
          confirmVariant="danger"
        >
          <p className="text-gray-600">
            Tem certeza que deseja excluir a cepa <strong>{selectedStrain?.name}</strong>?
            Esta ação não pode ser desfeita.
          </p>
        </Modal>
      </div>
    </div>
  )
}
