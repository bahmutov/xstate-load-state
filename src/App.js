import { useMachine } from '@xstate/react'
import { promiseMachine } from './machine'

const Component = () => {
  const [state, send] = useMachine(promiseMachine)

  if (window.Cypress) {
    window.state = state
  }

  return (
    <div className="flex flex-col">
      <div className="mb-5 self-center">
        {/** You can listen to what state the service is in */}
        {state.matches('pending') && <p>Loading it...</p>}
        {state.matches('rejected') && (
          <p className="settled">Promise Rejected</p>
        )}
        {state.matches('resolved') && (
          <p className="settled">Promise Resolved</p>
        )}
      </div>
      <div>
        {/** You can send events to the running service */}
        <button
          type="button"
          onClick={() => () => send('RESOLVE')}
          disabled={!state.matches('pending')}
          className="inline-block px-6 py-2.5 bg-green-500 text-white disabled:bg-green-300 font-medium text-xs leading-tight uppercase rounded shadow-md"
        >
          Resolve
        </button>
        <button
          onClick={() => setTimeout(() => send('RESOLVE'), 70)}
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
    <div className="flex flex-col justify-center items-center h-screen">
      <Component />
    </div>
  )
}
