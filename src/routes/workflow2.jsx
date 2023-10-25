import React, { useCallback, useEffect, useRef, useState } from "react"
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  MarkerType,
  updateEdge
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useParams } from 'wouter'

// import { edgeOptions } from "../Utils/workflowSetting"
import Dialog from "../Components/Dialog"
import { Condition, Action, Init, End, Node } from "../Workflow/CustomNode"
const nodeTypes = {
  condition: Condition,
  action: Action,
  init: Init,
  end: End,
  node: Node,
}

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
}

let id = 4;
const getId = () => `${id++}`;

const fitViewOptions = { padding: 3, }

// import defaultNodes from '../Workflow/nodes'
// import defaultEdges from '../Workflow/edges'

const WorkFlow = () => {
  const { name } = useParams()
  const [input, setInput] = useState()
  // const [initNodes, setNodes] = useState([])
  // const [initEdges, setEdges] = useState([])
  const edgeUpdateSuccessful = useRef(true)
  const reactFlowWrapper = useRef(true)
  const connectingNodeId = useRef(true)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  // const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes)
  // const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges)
  const { project } = useReactFlow()
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId
  }, [])

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false
  }, [])

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, [])

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    edgeUpdateSuccessful.current = true
  }, [])

  const onConnectEnd = useCallback((event) => {
    const targetIsPane = event.target.classList.contains('react-flow__pa')

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
      }

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.concat({
        id,
        source: connectingNodeId.current,
        target: id,
        animated: true,
        // type: 'smoothstep',
      }))
    }
  }, [project])


  useEffect(() => {
    const url = `http://localhost:1337/workflow/${name}`
    console.log(url)
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setInput(data.data)
          // console.log(data.data.workflow.nodes.length)
          // console.log(data.data.workflow.edges.length)
          console.log(data.data.workflow.nodes)
          setNodes(data.data.workflow.nodes)
          setEdges(data.data.workflow.edges)
        }
      })
  }, [])



  console.log(nodes)
  // console.log(edges)
  // console.log(input)


  return (
    <div className="wrapper" style={{ height: 'calc(100vh - 20px)' }} ref={reactFlowWrapper}>
      <h1>{name}</h1>
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
  )
}

export default () => (
  <ReactFlowProvider>
    <WorkFlow />
  </ReactFlowProvider>
)