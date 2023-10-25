import create from 'zustand'

export const useStore = create((set) => ({
  // count: {num: 0},
  // increment: () => set((state) => {
  //   // console.log(state.count)
  //   return ({ 
  //     count: {
  //       num: state.count.num + 1
  //     }
  //    })
  // }),
  // decrement: () => set((state) => {
  //   return ({ 
  //     count: {
  //       num: state.count.num - 1
  //     } 
  //   })
  // }),

  nested: {
    nodes: [
      {
        id: '1',
        type: 'custom',
        data: { name: 'Jane Doe', job: 'CEO', emoji: '😎' },
        position: { x: 0, y: 50 },
      },
    ],
  },

  saveNodes: () => set((state) => {
    // let newNodo = {...state}

    // console.log(state.nested.nodes[0].data.name)
    return ({
      nested: {
        nodes: [
          {
            data: {
              name: `${state.nested.nodes[0].data.name} `
            }
          }
        ]
      }
    })
  }),

  updateNode: (newState) => {
    // const amountState = get().nested.nodes
    console.log('newState', newState)

    set((state) => {
      console.log('state', state)
      return ({
        nested: {...state.nested}
        
      })
    })

  }
}))

// export default useStore