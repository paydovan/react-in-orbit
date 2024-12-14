export async function createGoalCompletion(
  goalId: string,
  token: string | null
) {
  const apiUrl = import.meta.env.VITE_API_URL // Acessando a variável de ambiente

  await fetch(`${apiUrl}/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho
    },
    body: JSON.stringify({
      goalId,
    }),
  })
}
