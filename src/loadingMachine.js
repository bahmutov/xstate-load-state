import { createMachine } from 'xstate'

export const loadingMachine = createMachine({
  id: 'loading',
  initial: 'pending',
  states: {
    pending: {
      on: {
        LOAD: {
          target: 'loading',
        },
      },
    },
    loading: {
      on: {
        RESOLVE: { target: 'resolved' },
        REJECT: { target: 'rejected' },
      },
    },
    resolved: {
      type: 'final',
    },
    rejected: {
      type: 'final',
    },
  },
})
