import React, { useState, useRef, memo, useEffect  } from 'react';
import { Handle, Position, useNodesState, useEdgesState } from 'reactflow';
import initialNodes from '../nodes'
import initialEdges from '../edges'

function CustomNode({ id, data }) {
  const fatherRef = useRef(null);
  const [height, setHeight] = useState(80)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    const size = fatherRef.current.offsetWidth - 20;
    setHeight(size);
  }, [height])
  return (
    <div className="resize shadow-md rounded-md bg-white border-2 border-orange-400"
      ref={fatherRef}
      style={{
        height
      }}
    >
      <div className="flex items-center justify-center h-[100%]">
        <div className="mx-2 p-5">
          <div className="text-lg font-medium">{data.name}</div>
          <button className='btn btn-sm' onClick={()=>document.getElementById(`${id}`).showModal()}>Edit</button>
        </div>
      </div>

      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !-top-3 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !-bottom-3 !bg-teal-500" />
    </div>
  )
}

export default memo(CustomNode);