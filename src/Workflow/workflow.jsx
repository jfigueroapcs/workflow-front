import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  MarkerType,
  updateEdge
} from 'reactflow';
import 'reactflow/dist/style.css';

import Dialog from '../Components/Dialog';

// import './index.css';
import { Condition, Action, Init, End, Node } from './CustomNode'
import { Route, useParams } from "wouter";
const nodeTypes = {
  condition: Condition,
  action: Action,
  init: Init,
  end: End,
  node: Node,
}
import defaultEdges from './edges.js';
import defaultNodes from './nodes.js';

const initialNodes = defaultNodes
const initialEdges = defaultEdges

const edgeOptions = {
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
  },
  type: 'smoothstep',
  style: {
    // stroke: skopeColor,
    strokeWidth: 2
  },
};


let id = 1;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 3,
};

const AddNodeOnEdgeDrop = () => {
  const params = useParams();
  console.log(defaultNodes)
  console.log(defaultEdges)
  const edgeUpdateSuccessful = useRef(true)
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { project } = useReactFlow();
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const id = getId();
        const newNode = {
          id,
          // we are removing the half of the node width (75) to center the new node
          type: 'node',
          position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
          data: { name: `Node ${id}` },
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat({
          id,
          source: connectingNodeId.current,
          target: id,
          animated: true,
          // type: 'smoothstep',
        }));
      }
    },
    [project]
  );

  return (
    <div className="wrapper" style={{ height: 'calc(100vh - 20px)' }} ref={reactFlowWrapper}>
      <h1>{``}</h1>
      {nodes.map((item) => {
        return <Dialog nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange} key={item.id} item={item} />
      })}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        defaultEdgeOptions={edgeOptions}
        connectionLineStyle={{ stroke: '#D3D2E5' }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        fitView
        nodeTypes={nodeTypes}
        fitViewOptions={fitViewOptions}
      />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);
