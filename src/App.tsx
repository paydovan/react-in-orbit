import { BrowserRouter as Router } from 'react-router-dom' // Importando o Router
import { Dialog } from './components/ui/dialog'
import { Summary } from './components/summary'
import { AuthProvider, useAuth } from './context/authContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/login'
import Register from './components/register'

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { user, loading } = useAuth()

  // Se ainda estiver carregando, você pode exibir uma tela de loading
  if (loading) return <div>Carregando...</div>

  // Se não estiver autenticado, redireciona para a página de login
  if (!user) {
    // console.log('usuario: ', user)
    return <Navigate to="/login" />
  }

  return element // Se estiver autenticado, renderiza a página protegida
}

export function App() {
  return (
    <Router>
      {' '}
      {/* Envolva a aplicação com o Router */}
      <AuthProvider>
        <Routes>
          {/* Rota de Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rota protegida: Só acessível se estiver autenticado */}
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={
                  <Dialog>
                    <Summary />
                  </Dialog>
                }
              />
            }
          />
          {/* Redirecionar rota não autenticada para login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}
