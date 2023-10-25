import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  MarkerType,
  updateEdge,
  Background
} from 'reactflow';
import 'reactflow/dist/style.css';

import Dialog from '../Components/Dialog'

// import './index.css';
import { Condition, Action, Init, End, Node, Box } from '../Workflow/CustomNode'
import { Route, useParams } from "wouter";
const nodeTypes = {
  condition: Condition,
  action: Action,
  init: Init,
  end: End,
  node: Node,
  box: Box,
}
import defaultEdges from '../Workflow/edges';
import defaultNodes from '../Workflow/nodes';

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


let id = 4;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 0.5,
};


const WorkFlow = () => {
  const { slug } = useParams()
  const [input, setInput] = useState()
  const edgeUpdateSuccessful = useRef(true)
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
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
  )

  useEffect(() => {
    const url = `http://localhost:1337/workflow/${slug}`
    fetch(url).then(res => res.json())
      .then(data => {
        // console.log(data)
        if (data.success) {
          setInput(data.data)

          let addNodes = [{
            id: '00',
            type: 'box',
            // type: 'default',
            // className: 'annotation',
            data: {
              label: (<Box />),
              input: {
                slug: data.data.slug,
                title: data.data.title,
                description: data.data.description
              },
            },
            // draggable: false,
            selectable: false,

            position: { x: 100, y: -150 },
          },
          ...data.data.workflow.nodes]

          // addNodes.push({
          //   id: '00',
          //   type: 'box',
          //   // type: 'default',
          //   // className: 'annotation',
          //   data: {
          //     label: (<Box />),
          //     input: {
          //       slug: data.data.slug,
          //       title: data.data.title,
          //       description: data.data.description
          //     },
          //   },
          //   // draggable: false,
          //   selectable: false,

          //   position: { x: 100, y: -150 },
          // })

          setNodes(addNodes)
          setEdges(data.data.workflow.edges)
        }
      })

  }, [])

  return (
    <div className="wrapper" style={{ height: 'calc(100vh - 20px)' }} ref={reactFlowWrapper}>
      <h1>{input?.title}</h1>
      {nodes.map((item) => {
        return <Dialog nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange} key={item.id} item={item} />
      })}
      <ReactFlow
        maxZoom={2}
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
      >
        <Background variant="dots" gap={15} size={1} />
      </ReactFlow>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <WorkFlow />
  </ReactFlowProvider>
);
