import ReactFlow, { ReactFlowProvider, useReactFlow, Background } from 'reactflow';
import 'reactflow/dist/style.css';

import defaultNodes from './nodes.js';
import defaultEdges from './edges.js';
import { useCallback } from 'react';

const skopeColor = '#D3D2E5'

const edgeOptions = {
  animated: true,
  style: {
    // stroke: skopeColor,
  },
};

const connectionLineStyle = { stroke: skopeColor };
let nodeId = 0
const proOptions = { hideAttribution: true };

function Flow() {
    const reactFlowInstance = useReactFlow()
    const onClick = useCallback(() => {
        const id = `${++nodeId}`;
        const newNode = {
          id,
          position: {
            x: Math.random() * 500,
            y: Math.random() * 500,
          },
          data: {
            label: `Node ${id}`,
          },
        };
        reactFlowInstance.addNodes(newNode);
    }, [])
    
  return (
    <div style={{ height: 'calc(100vh - 20px)' }}>
        <h1>WorkFlow Dpp</h1>

      <button onClick={onClick}  className="btn-add">
        add node
      </button>
        <ReactFlow
            defaultNodes={defaultNodes}
            defaultEdges={defaultEdges}
            defaultEdgeOptions={edgeOptions}
            fitView
            // style={{
            //     backgroundColor: '#D3D2E5',
            // }}
            connectionLineStyle={connectionLineStyle}
            proOptions={proOptions}
            nodesDraggable
        >
            <Background />
        </ReactFlow>
    </div>
  );
}

export default function Dpp(){
    return(
        <ReactFlowProvider>
            <Flow />
        </ReactFlowProvider>
    );
}