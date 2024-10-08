import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
import { useQuery } from '@tanstack/react-query'
import { EmptyGoals } from './components/empty-goals'
import { getSummary } from './http/get-summary'
import { Loader } from './components/ui/loader'

export function App() {
  const { data, isLoading } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 segundos
  })

  if (isLoading || !data) {
    return <Loader />
  }

  return (
    <Dialog>
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}
