import create from 'zustand'
import defaultNodes from './nodes.js';

export const useStoreNodes = create((set) => ({
  nodes: defaultNodes,
  updateNode: (newNodes) => {
    // console.log('====>', newNodes)
    set((state) => {
      return({nodes: newNodes})
    })
  }
}))