export async function createGoalCompletion(goalId: string) {
  const apiUrl = import.meta.env.VITE_API_URL // Acessando a variável de ambiente
  await fetch(`${apiUrl}/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalId,
    }),
  })
}
