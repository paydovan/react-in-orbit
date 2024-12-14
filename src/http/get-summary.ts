type SummaryResponse = {
  completed: number
  total: number
  goalsPerDay: Record<
    string,
    {
      id: string
      title: string
      completedAt: string
    }[]
  >
}

export async function getSummary(): Promise<SummaryResponse> {
  const apiUrl = import.meta.env.VITE_API_URL // Acessando a variável de ambiente
  const token = localStorage.getItem('token') // Recuperando o token do localStorage

  const response = await fetch(`${apiUrl}/summary`, {
    method: 'GET', // Método GET para buscar dados
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '', // Adicionando o token no cabeçalho
    },
  })

  if (!response.ok) {
    throw new Error('Erro ao buscar dados do resumo') // Tratamento de erro se a resposta não for ok
  }

  const data = await response.json()

  return data.summary // Retorna os dados conforme esperado
}
