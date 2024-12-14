interface CreateGoalRequest {
  userId: string | undefined
  title: string
  desiredWeeklyFrequency: number
  token: string | null
}

export async function createGoal({
  userId,
  title,
  desiredWeeklyFrequency,
  token,
}: CreateGoalRequest) {
  const apiUrl = import.meta.env.VITE_API_URL // Acessando a variável de ambiente

  await fetch(`${apiUrl}/goals`, {
    // Usando a variável de ambiente na URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho
    },
    body: JSON.stringify({
      userId,
      title,
      desiredWeeklyFrequency,
    }),
  })
}
