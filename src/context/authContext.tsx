import { createContext, useState, useEffect, useContext } from 'react'
import type { ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'

interface User {
  id: string
  name: string
  email: string
  exp?: number
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token') || null
  )
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (token) {
      try {
        const decodedToken: User = jwtDecode(token)
        if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
          console.error('Token expirado')
          logout()
        } else {
          setUser(decodedToken)
        }
      } catch (error) {
        console.error('Token inválido:', error)
        logout()
      }
    } else {
      setUser(null)
    }
    setLoading(false)
  }, [token])

  const login = (token: string) => {
    try {
      const decodedToken: User = jwtDecode(token)
      if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
        console.error('Token expirado no login')
        logout()
        return
      }
      setToken(token)
      setUser(decodedToken)
      localStorage.setItem('token', token)
    } catch (error) {
      console.error('Erro ao decodificar token no login:', error)
      logout()
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
