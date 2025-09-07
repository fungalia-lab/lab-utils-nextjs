import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

const entities = [
  {
    name: 'Strains',
    description: 'Cepas de fungos/bactérias',
    href: '/strains',
    icon: '🧬',
    color: 'border-emerald-500 bg-emerald-50'
  },
  {
    name: 'Culture Types',
    description: 'Tipos de cultura',
    href: '/culture-types',
    icon: '🧪',
    color: 'border-green-500 bg-green-50'
  },
  {
    name: 'Grow Parameters',
    description: 'Parâmetros de crescimento',
    href: '/grow-parameters',
    icon: '📊',
    color: 'border-purple-500 bg-purple-50'
  },
  {
    name: 'Substrates',
    description: 'Substratos',
    href: '/substrates',
    icon: '🌱',
    color: 'border-yellow-500 bg-yellow-50'
  },
  {
    name: 'Consumable Items',
    description: 'Itens consumíveis',
    href: '/consumable-items',
    icon: '📦',
    color: 'border-red-500 bg-red-50'
  },
  {
    name: 'Durable Items',
    description: 'Itens duráveis',
    href: '/durable-items',
    icon: '🔧',
    color: 'border-indigo-500 bg-indigo-50'
  },
  {
    name: 'Protocols',
    description: 'Protocolos/Ações',
    href: '/protocols',
    icon: '📋',
    color: 'border-pink-500 bg-pink-50'
  }
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Lab Catalog Dashboard
          </h1>
          <p className="text-gray-600">
            Gerencie todas as entidades do catálogo do laboratório
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Entidades</CardTitle>
              <span className="text-2xl">📊</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-gray-500">Categorias disponíveis</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Endpoints</CardTitle>
              <span className="text-2xl">🔌</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35</div>
              <p className="text-xs text-gray-500">Endpoints REST</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Operações CRUD</CardTitle>
              <span className="text-2xl">⚡</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-gray-500">Por entidade</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Banco de Dados</CardTitle>
              <span className="text-2xl">🗄️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">SQLite</div>
              <p className="text-xs text-gray-500">Desenvolvimento</p>
            </CardContent>
          </Card>
        </div>

        {/* Entity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entities.map((entity) => (
            <Link key={entity.name} href={entity.href}>
              <Card className={`hover:shadow-lg transition-shadow cursor-pointer border-l-4 ${entity.color}`}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{entity.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{entity.name}</CardTitle>
                      <CardDescription>{entity.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Gerenciar →</span>
                    <div className="flex space-x-1">
                      <span className="text-xs bg-white px-2 py-1 rounded">CRUD</span>
                      <span className="text-xs bg-white px-2 py-1 rounded">API</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/api-docs">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>📚</span>
                    <span>Documentação da API</span>
                  </CardTitle>
                  <CardDescription>
                    Consulte todos os endpoints disponíveis com Swagger
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <strong>GET</strong> /api/[entity] - Listar todos
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>POST</strong> /api/[entity] - Criar novo
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>PUT</strong> /api/[entity]/[id] - Atualizar
                    </div>
                    <div className="text-sm text-emerald-600 font-medium mt-2">
                      📖 Ver documentação completa →
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>🔧</span>
                  <span>Configuração</span>
                </CardTitle>
                <CardDescription>
                  Banco de dados e ambiente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <strong>Banco:</strong> SQLite (dev.db)
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>ORM:</strong> Prisma
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Validação:</strong> Zod
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>🚀</span>
                  <span>Desenvolvimento</span>
                </CardTitle>
                <CardDescription>
                  Comandos úteis para desenvolvimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">npm run dev</code>
                  </div>
                  <div className="text-sm text-gray-600">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">npx prisma db push</code>
                  </div>
                  <div className="text-sm text-gray-600">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">npx prisma studio</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
