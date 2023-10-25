import React, { memo, useEffect, useState } from 'react';
import { useStoreApi } from 'reactflow';



const Box = ({ id, data }) => {
  const { input } = data
  // console.log(input)
  const [inputs, setInputs] = useState({})
  const [title, setTitle] = useState(input.title)
  const [description, setDescription] = useState(input.description)
  const [err, setErr] = useState({
    error: false,
    message: 'you need at least one conditional node and one action node'
  })
  const store = useStoreApi()

  const [validation, setValidation] = useState(false)

  const validateNodesRequire = () => {

    const nodeBases = store.getState().nodeInternals

    const values = Array.from(nodeBases.values())

    let issetCondition = values.filter(x => x.type === 'condition')
    let issetAction = values.filter(x => x.type === 'action')

    // console.log(issetCondition, issetAction)
    if (issetCondition.length >= 1 && issetAction.length >= 1) {
      // setValidation(true)
      return false
      // }else{
      // setValidation(false)
    }
    return true


  }

  // useEffect(_ => {
  //   setValidation(validateNodesRequire())
  // }, [validation])



  const update = () => {
    const { nodeInternals } = store.getState()
    // console.log(nodeInternals.values())
    // console.log('======>', store.getState().edges)

    const newNodes = []
    const newEdges = []

    Array.from(nodeInternals.values()).map(node => {
      // console.log(node)
      if (node.id !== "00") {
        const { id, type, data, position, positionAbsolute } = node
        newNodes.push({
          id,
          type,
          data,
          position,
          positionAbsolute
        })
      }
    })

    // console.log('error', validateNodesRequire())

    const newInputs = {
      title,
      description,
      workflow: {
        nodes: newNodes,
        edges: store.getState().edges
      }
    }

    // if(validateNodesRequire()){
    const eerr = { ...err }
    setErr({
      error: validateNodesRequire(),
      message: eerr.message
    })
    // }

    console.log(err)

    // if(validateNodesRequire() === false){ // false para identificar que no hay ningun error
    //   console.log('guardar datos')
    // }

    // console.log(validateNodesRequire(),  newInputs)

  }

  // console.log(err)


  return (
    <>
      <div className={`alert alert-warning mb-6 ${err.error !== true ? 'opacity-0' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span>Warning: {err.message}!</span>
      </div>
      <div className='py-[8px] border-b-slate-400 '>
        Workflow Data
      </div>
      <div className="px-3 flex flex-col justify-center align-ceter max-w-xs m-auto">
        <input type="text" placeholder="Type here" className="input input-ghost input-bordered input-sm w-full max-w-xs"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="textarea textarea-bordered w-full max-w-xs mt-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <div className='max-w-xs py-5'>

          <button className="btn btn-outline btn-sm justify-self-end" onClick={() => update()}>Save</button>
        </div>

        {/* <div className="flex flex-row-reverse px-6 py-5 max-w-xs">
          <button className="btn btn-outline btn-sm justify-self-end" onClick={() => update()}>Save</button>
        </div> */}
      </div>
    </>
  )
}

export default memo(Box)