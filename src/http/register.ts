// Interface para os dados de login (entrada)
export interface LoginCredentials {
  email: string
  password: string
}

export async function registerApi({ email, password }: LoginCredentials) {
  const apiUrl = import.meta.env.VITE_API_URL // Acessando a variável de ambiente

  const response = await fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  // Verifica se a resposta foi bem-sucedida (status 200-299)
  if (!response.ok) {
    throw new Error('Internal server Error')
  }
}
