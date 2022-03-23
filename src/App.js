import { useMachine } from '@xstate/react'
import machine from './machine'

const Component = () => {
  const [state, send] = useMachine(machine)

  return (
    <div className="flex flex-col">
      <div className="mb-5 self-center">
        {/** You can listen to what state the service is in */}
        {state.matches('pending') && <p>Loading it...</p>}
        {state.matches('rejected') && <p>Promise Rejected</p>}
        {state.matches('resolved') && <p>Promise Resolved</p>}
      </div>
      <div>
        {/** You can send events to the running service */}
        <button
          onClick={() => send('RESOLVE')}
          type="button"
          disabled={!state.matches('pending')}
          className="inline-block px-6 py-2.5 bg-green-500 text-white disabled:bg-green-300 font-medium text-xs leading-tight uppercase rounded shadow-md"
        >
          Resolve
        </button>
        <button
          onClick={() => send('REJECT')}
          type="button"
          disabled={!state.matches('pending')}
          className="inline-block ml-4 px-6 py-2.5 bg-red-600 text-white disabled:bg-red-300 font-medium text-xs leading-tight uppercase rounded shadow-md"
        >
          Reject
        </button>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Component />
    </div>
  )
}
