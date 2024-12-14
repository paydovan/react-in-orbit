import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

import goalSvg from '../assets/goal-amico.svg'
import { useState } from 'react'
import { registerApi } from '../http/register'

const registerForm = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type RegisterForm = z.infer<typeof registerForm>

export default function Register() {
  const [errors, setErrors] = useState('')
  const [success, setSuccess] = useState('')
  const { register, handleSubmit, formState, reset } = useForm<RegisterForm>({
    resolver: zodResolver(registerForm),
  })

  async function handleRegister(data: RegisterForm) {
    try {
      await registerApi({
        email: data.email,
        password: data.password,
      })

      // Reseta o formulário
      reset()

      setSuccess('Conta criada com sucesso!')
    } catch (error) {
      // Se houver um erro no login, exibe a mensagem
      setErrors('Email ou senha incorretos')
      reset()
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto h-screen items-center justify-center p-8">
      <div className="flex flex-col gap-6 flex-1 w-full">
        <div>
          <h1 className="text-3xl md:text-5xl">in.orbit register</h1>
        </div>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col justify-between"
        >
          <div className="flex flex-col gap-6 flex-grow-0">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Digite seu email</Label>
              <Input
                id="email"
                autoFocus
                placeholder="johndoe@acme.com"
                {...register('email')}
              />

              {formState.errors.email && (
                <p className="text-red-400 text-sm">
                  {formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Digite sua senha</Label>
              <Input id="password" type="password" {...register('password')} />

              {formState.errors.password && (
                <p className="text-red-400 text-sm">
                  {formState.errors.password.message}
                </p>
              )}
            </div>
          </div>
          {errors && <p className="text-red-400 text-sm mt-2">{errors}</p>}
          <p className="mt-4">
            Já possui uma Conta?{' '}
            <Link to="/login" className="underline">
              Entre agora!
            </Link>
          </p>

          <Button className="flex-1 mt-4" type="submit">
            Login
          </Button>

          {success && <p className="text-green-400 text-sm mt-2">{success}</p>}
        </form>
      </div>
      <div className="flex-1 flex justify-center">
        <img src={goalSvg} alt="imagem teste" className="w-96" />
      </div>
    </div>
  )
}
