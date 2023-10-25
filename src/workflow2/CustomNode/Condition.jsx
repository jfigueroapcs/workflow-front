import React, { useState, useRef, memo, useEffect } from 'react';
import { Handle, Position, useNodesState, useEdgesState } from 'reactflow';

// import Editable from '../../Components/Editable';
// import { useStoreNodes } from '../store';
import initialNodes from '../nodes'
import initialEdges from '../edges'


function CustomNode({ id, data, type }) {
  
  const fatherRef = useRef(null);
  const [height, setHeight] = useState(80)

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    const size = fatherRef.current.offsetWidth;
    setHeight(size);
  }, [height])
  return (<>
    <div className="resize shadow-md rounded-md bg-white border-2 border-blue-400 transform"
      ref={fatherRef}
      style={{
        height,
        transform: 'rotate(-45deg) skew(15deg, 15deg)'
      }}
    >
      <div className="flex items-center justify-center h-[100%]">
        <div className="ml-2 transform rotate-45">
          <div className="text-lg font-medium">{data.name}</div>
          <button className='btn btn-sm' onClick={()=>document.getElementById(`${id}`).showModal()}>Edit</button>
          {/* <button onClick={() => update()}>update</button> */}
        </div>
      </div>

      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" style={{ marginLeft: '50%' }} />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" style={{ marginLeft: '-50%' }} />
    </div>
    
  </>)
}

export default memo(CustomNode);