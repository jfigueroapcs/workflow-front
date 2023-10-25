import React, { useCallback } from 'react';
import ReactFlow, { addEdge, useNodesState, useEdgesState, MarkerType } from 'reactflow';

import CustomNode from './CustomNode';
import FloatingEdge from './FloatingEdge';
import CustomConnectionLine from './CustomConnectionLine';

import 'reactflow/dist/style.css';
import './style.css';

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: { label: 'Init'}
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 250, y: 320 },
    data: { label: 'accion'}
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 40, y: 300 },
    data: { label: 'condicion'}
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 300, y: 0 },
    data: { label: 'end'}
  },
];

const initialEdges = [];

const connectionLineStyle = {
  strokeWidth: 3,
  stroke: 'black',

};

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  floating: FloatingEdge,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: 'black' },
  type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'black',
  },
};

const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  return (
    <div style={{ height: 'calc(100vh - 20px)' }}>
      <p>Hola mundo</p>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineComponent={CustomConnectionLine}
        connectionLineStyle={connectionLineStyle}
      />
    </div>)
}

export default Workflow