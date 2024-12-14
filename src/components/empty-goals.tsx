import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

import logo from '../assets/logo-in-orbit.svg'
import letsStart from '../assets/let-start-illustration.svg'
import { CreateGoal } from './create-goal'

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="logo in orbit" />
      <img src={letsStart} alt="let start illustration" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
        <DialogContent>
          <CreateGoal />
        </DialogContent>
      </Dialog>
    </div>
  )
}
