'use client'

import { useEffect, useState } from 'react'

export default function ApiDocsPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Carregar Swagger UI dinamicamente
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js'
    script.onload = () => {
      // Carregar CSS
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css'
      document.head.appendChild(link)

      // Inicializar Swagger UI
      setTimeout(() => {
        if (window.SwaggerUIBundle) {
          window.SwaggerUIBundle({
            url: '/api/swagger.json',
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              window.SwaggerUIBundle.presets.apis,
              window.SwaggerUIBundle.presets.standalone
            ],
            plugins: [
              window.SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: 'StandaloneLayout',
            docExpansion: 'list',
            defaultModelsExpandDepth: 2,
            defaultModelExpandDepth: 2,
            displayRequestDuration: true,
            tryItOutEnabled: true,
            supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
            onComplete: () => {
              // Adicionar estilos customizados
              const style = document.createElement('style')
              style.textContent = `
                .swagger-ui .topbar { display: none; }
                .swagger-ui .info { margin: 20px 0; }
                .swagger-ui .info .title { color: #059669; }
                .swagger-ui .scheme-container { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .swagger-ui .opblock.opblock-get .opblock-summary { border-color: #10b981; }
                .swagger-ui .opblock.opblock-post .opblock-summary { border-color: #3b82f6; }
                .swagger-ui .opblock.opblock-put .opblock-summary { border-color: #f59e0b; }
                .swagger-ui .opblock.opblock-delete .opblock-summary { border-color: #ef4444; }
              `
              document.head.appendChild(style)
              setIsLoading(false)
            }
          })
        }
      }, 100)
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="swagger-ui-dist"]')
      const existingLink = document.querySelector('link[href*="swagger-ui-dist"]')
      if (existingScript) existingScript.remove()
      if (existingLink) existingLink.remove()
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando documentação da API...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <span className="mr-3">📚</span>
                API Documentation
              </h1>
              <p className="text-gray-600">
                Documentação completa da API do FungaliaLab Catalog
              </p>
            </div>
            <div className="flex space-x-3">
              <a
                href="/api/swagger.json"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                📄 JSON Spec
              </a>
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
              >
                🏠 Voltar ao Dashboard
              </a>
            </div>
          </div>
        </div>

        {/* Swagger UI */}
        <div className="bg-white rounded-lg shadow">
          <div id="swagger-ui"></div>
        </div>

        {/* Footer com informações adicionais */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Informações da API</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">🔗 Endpoints Principais</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><code className="bg-gray-200 px-2 py-1 rounded">GET /api/strains</code> - Listar cepas</li>
                <li><code className="bg-gray-200 px-2 py-1 rounded">GET /api/culture-types</code> - Listar tipos de cultura</li>
                <li><code className="bg-gray-200 px-2 py-1 rounded">GET /api/grow-parameters</code> - Listar parâmetros</li>
                <li><code className="bg-gray-200 px-2 py-1 rounded">GET /api/substrates</code> - Listar substratos</li>
                <li><code className="bg-gray-200 px-2 py-1 rounded">GET /api/consumable-items</code> - Listar itens consumíveis</li>
                <li><code className="bg-gray-200 px-2 py-1 rounded">GET /api/durable-items</code> - Listar itens duráveis</li>
                <li><code className="bg-gray-200 px-2 py-1 rounded">GET /api/protocols</code> - Listar protocolos</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">🛠️ Operações CRUD</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><span className="text-green-600 font-medium">GET</span> - Listar todos os recursos</li>
                <li><span className="text-green-600 font-medium">GET /:id</span> - Buscar recurso específico</li>
                <li><span className="text-blue-600 font-medium">POST</span> - Criar novo recurso</li>
                <li><span className="text-yellow-600 font-medium">PUT /:id</span> - Atualizar recurso</li>
                <li><span className="text-red-600 font-medium">DELETE /:id</span> - Excluir recurso</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">💡 Exemplos de Uso</h4>
            <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-100 overflow-x-auto">
              <pre>{`# Criar uma nova cepa
curl -X POST http://localhost:3000/api/strains \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Nova Cepa",
    "species": "Pleurotus ostreatus",
    "description": "Descrição da cepa",
    "origin": "Laboratório XYZ",
    "characteristics": "[\"alta produtividade\", \"resistente\"]"
  }'

# Buscar uma cepa específica
curl http://localhost:3000/api/strains/cmf8tfrcr0000mqm0b8btdbgj

# Atualizar uma cepa
curl -X PUT http://localhost:3000/api/strains/cmf8tfrcr0000mqm0b8btdbgj \\
  -H "Content-Type: application/json" \\
  -d '{"description": "Nova descrição"}'

# Excluir uma cepa
curl -X DELETE http://localhost:3000/api/strains/cmf8tfrcr0000mqm0b8btdbgj`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
