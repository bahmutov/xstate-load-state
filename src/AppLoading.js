import { useMachine } from '@xstate/react'
import { loadingMachine } from './loadingMachine'

const Component = () => {
  const [state, send] = useMachine(loadingMachine)

  if (window.Cypress) {
    window.state = state
  }

  return (
    <div className="flex flex-col">
      <div className="mb-5 self-center">
        {/** You can listen to what state the service is in */}
        {state.matches('pending') && <p data-state="initial">Initial</p>}
        {state.matches('loading') && <p data-state="loading">Loading it...</p>}
        {state.matches('rejected') && (
          <p data-state="loaded">Promise Rejected</p>
        )}
        {state.matches('resolved') && (
          <p data-state="loaded">Promise Resolved</p>
        )}
      </div>

      {/* we only show the Resolve/Reject buttons at the loading step */}
      {state.matches('pending') && (
        <div>
          <button
            type="button"
            onClick={() => {
              send('LOAD')
              setTimeout(() => {
                send('RESOLVE')
              }, 900)
            }}
            disabled={!state.matches('pending')}
            className="inline-block px-6 py-2.5 bg-green-500 text-white disabled:bg-green-300 font-medium text-xs leading-tight uppercase rounded shadow-md"
          >
            Resolve
          </button>
          <button
            onClick={() => {
              send('LOAD')
              setTimeout(() => {
                send('REJECT')
              }, 900)
            }}
            type="button"
            disabled={!state.matches('pending')}
            className="inline-block ml-4 px-6 py-2.5 bg-red-600 text-white disabled:bg-red-300 font-medium text-xs leading-tight uppercase rounded shadow-md"
          >
            Reject
          </button>
        </div>
      )}
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
