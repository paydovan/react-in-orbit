type PendingGoalsResponse = {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}[]

export async function getPendingGoals(): Promise<PendingGoalsResponse> {
  const apiUrl = import.meta.env.VITE_API_URL // Acessando a variável de ambiente

  // Recuperando o token do localStorage ou do contexto (se você já tiver o contexto de autenticação configurado)
  const token = localStorage.getItem('token')

  // Se não houver token, pode retornar uma lista vazia ou lançar um erro
  if (!token) {
    throw new Error('Token não encontrado. Usuário não autenticado.')
  }

  // Fazendo a requisição com o cabeçalho Authorization
  const response = await fetch(`${apiUrl}/pending-goals`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho
    },
  })

  // Verificando se a resposta foi bem-sucedida
  if (!response.ok) {
    throw new Error('Erro ao buscar metas pendentes')
  }

  const data = await response.json()

  return data.pedingGoals
}
