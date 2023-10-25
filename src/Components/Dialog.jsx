import { useState, useEffect } from 'react';

const Dialog = ({ item, nodes, setNodes }) => {
  const { id, type } = item
  const [name, setName] = useState(item.data.name)
  const [select, setSelect] = useState(item.type)
  // let title = type === 'condition' ? 'Conditional Box' : (type === 'action' ? 'Action Box' : 'Default')
  let title = type === 'condition' ? 'Conditional Box' : (type === 'action' ? 'Action Box' : '')

  const updateName = (e) => {
    console.log(e.target.value)
    setName(e.target.value)
  }
  const updateType = (e) => {
    // console.log(e.target.value)
    setSelect(e.target.value)
  }


  const closeAndReset = () => {
    document.getElementById(`${id}`).close()
    setName(item.data.name)

  }

  const nodeTypes = ['condition', 'action', 'node']

  useEffect(() => {
    setNodes((nds) => nds.map((node) => {
      if (node.id === id) {
        node.data = {
          ...node.data,
          name: name
        }
      }
      // console.log(node)
      return node
    }))
  }, [name, setNodes])

  useEffect(() => {
    setNodes((nds) => nds.map((node) => {
      if (node.id === id) {
        node = {
          ...node,
          type: select
        }
      }
      return node
    }))
  }, [select, setNodes])

  return (
    <dialog id={`${id}`} className="modal">
      <div className="modal-box">
        {/* <form method="dialog"> */}
        <button className="btn btn-circle btn-outline btn-sm absolute right-2 top-2" onClick={() => closeAndReset()}>✕</button>
        {/* </form> */}
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="flex flex-col justify-around">
          <div className="flex flex-row">
            <input type="text" placeholder="Type here" className="input input-ghost input-sm w-full max-w-xs"
              value={name}
              onChange={e => updateName(e)}
            />
            <select className="select select-bordered select-sm w-full max-w-xs ml-4"
              value={select}
              onChange={(e) => updateType(e)}>
              {nodeTypes.map((itm, idx) => {

                if (itm === 'condition') return <option key={idx} value={itm}>Conditional Box</option>

                if (itm === 'action') return <option key={idx} value={itm}>Action Box</option>

                if (select === 'node') return <option key={idx} value={itm}> Select...</option>

              })}
            </select>
            <div className="flex flex-row-reverse pl-4">
              <button className="btn btn-outline btn-sm justify-self-end" onClick={() => document.getElementById(`${id}`).close()}>close</button>
            </div>
          </div>
          {/* <div className="flex flex-row-reverse pt-4">
            <button className="btn btn-outline btn-sm justify-self-end" onClick={() => update()}>save</button>
          </div> */}
        </div>
      </div>
    </dialog>
  )
}

export default Dialog