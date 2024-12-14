// Interface para os dados de login (entrada)
export interface LoginCredentials {
  email: string
  password: string
}

// Interface para a resposta da API (saída)
export interface Root {
  token: string
  user: User
}

// Interface para o usuário
export interface User {
  id: string
  email: string
}

// Função de login, agora com o tipo correto para os dados de entrada
export async function login({
  email,
  password,
}: LoginCredentials): Promise<Root> {
  const apiUrl = import.meta.env.VITE_API_URL // Acessando a variável de ambiente

  const response = await fetch(`${apiUrl}/login`, {
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
    throw new Error('Falha na autenticação')
  }

  const data: Root = await response.json() // Tipando a resposta como Root

  return data
}
