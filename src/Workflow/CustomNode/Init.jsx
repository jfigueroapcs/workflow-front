import React, { useState, useRef, memo, useEffect  } from 'react';
import { Handle, Position, NodeResizeControl } from 'reactflow';

function CustomNode({ data }) {
  const fatherRef = useRef(null);
  const [height, setHeight] = useState(80)
  const [width, setWidth] = useState(80)
  useEffect(() => {
    const size = fatherRef.current.offsetWidth;
    setHeight(size);
  }, [height])
  return (
    <div className="resize shadow-md rounded-full bg-white border-2 border-green-400"
      ref={fatherRef}
      style={{
        height
      }}
    >
      <div className="flex items-center justify-center h-[100%]">
        <div className="mx-5">
          <div className="text-lg font-medium">{data.name}</div>
        </div>
      </div>

      {/* <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" /> */}
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !-bottom-3 !bg-teal-500" />
    </div>
  )
}

export default memo(CustomNode);