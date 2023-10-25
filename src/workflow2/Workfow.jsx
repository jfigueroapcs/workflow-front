import ReactFlow, { ReactFlowProvider, Background, useNodesState, useEdgesState, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { useEffect, useState } from 'react';

import { getSlug } from '../Utils/getSlug';

import { Condition, Action, Init, End } from './CustomNode'
import Dialog from '../Components/Dialog';

const nodeTypes = {
  condition: Condition,
  action: Action,
  init: Init,
  end: End,
}
import defaultEdges from './edges.js';
import defaultNodes from './nodes.js';

const skopeColor = '#D3D2E5'

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

const connectionLineStyle = {
  stroke: skopeColor,
  // markerEnd: { type: MarkerType.ArrowClosed }
};
const proOptions = { hideAttribution: true };

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateAreas: `'header header' 'sidebar content' 'footer footer'`,
  },
  header: {
    gridArea: 'header',
    height: '10px',
  },
  sidebar: {
    gridArea: 'sidebar',
    height: '10px',
  },
  content: {
    gridArea: 'content',
    height: '10px',
  },
  footer: {
    gridArea: 'footer',
    height: '10px',
  },
}

const Menu = ({ isSave, setIsSave, name, setName, type, setType }) => {

  // console.log(nodes)

  const updateName = (e) => {
    setName(e.target.value)
  }

  const openModalAdd = (_type) => {
    setType(_type)
    // console.log(_type)
    document.getElementById('add_new').showModal()
  }

  const save = () => {
    setIsSave(true)
    // console.log(name, getSlug(name), type)
    const nodo = {
      id: getSlug(name),
      data: { name },
      position: { x: -200, y: 400 },
      type,
    }
    // console.log(nodo)
  }

  return (<>
    <dialog id="add_new" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{type === 'condition' ? 'Conditional Box' : 'Action Box'}</h3>
        <div className="flex flex-col justify-around">
          <div className="flex flex-row">
            <input type="text" placeholder="Type here" className="input input-ghost input-sm w-full max-w-xs"
              value={name}
              // onChange={e => setName(e.target.value)}
              onChange={e => updateName(e)}
            />

            <div className="flex flex-row-reverse pl-4">
              <button className="btn btn-outline btn-sm justify-self-end" onClick={() => save()}>save</button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
    <ul className="menu menu-horizontal bg-base-200  rounded-box">
      {/* <li>
        <a className="tooltip tooltip-right" data-tip="Home">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAvklEQVR4nO1UOw7CMAzNhSDOGruDDQPlJDAwMHVl7J1YOUl7EJDbAakiAkcpEp8nvcV60Ysd5zn3DkDkLaD0QHJ9SJQeUOpcvRsKFcfUBZa4JkDucvVOXZ92SXeNVf83+IkRofS6WinxIko1XVOLXg/UWkh/HO4CrTa5+i8AWLPFCnO2WGFeuwkC8UHp5jLwyCdlcQMg3nuSxhOfR0oTouyKGXjiIxC3gHIZSNxqrZjB7CN6/ZGt2eKM+OhsuQHWqsxbITo/hwAAAABJRU5ErkJggg=="/>
        </a>
      </li> */}
      <li>
        <a onClick={() => openModalAdd('condition')}>
          <img width="24" height="24" src="https://img.icons8.com/windows/32/rhombus.png" alt="rhombus" />
          Conditional Box
        </a>
      </li>
      <li>
        <a onClick={() => openModalAdd('action')}>
          <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/rounded-rectangle-stroked.png" alt="rounded-rectangle-stroked" />
          Action Box
        </a>
      </li>
      {/* <li>
        <a className="tooltip tooltip-right" data-tip="Stats">
          <img width="25" height="25" src="https://img.icons8.com/ios/50/save--v1.png" alt="save--v1"/>
        </a>
      </li> */}
    </ul>
  </>)
}


const WorkFlowContent = () => {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [isSave, setIsSave] = useState(false)

  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);

  useEffect(() => {
    // setNodes((nds) => nds.map((node) => {
    if (name !== '' && type !== '') {
      console.log('--------------X---------------------')
      setNodes((nds) => nds.concat({
        id: getSlug(name),
        data: { name },
        position: { x: -200, y: 400 },
        type,
      }))
      setNodes((nds) => nds.map((node) => {
        if (node.id) {
          node = {
            ...node,
          }
        }
        return node
      }))
    }
    // return nodes
    // }))
  }, [isSave, setIsSave])

  return (
    <div style={{ height: 'calc(100vh - 20px)' }}>
      <h1>WorkFlow Tailwind & DaisyUI</h1>
      {/* <Menu isSave={isSave} setIsSave={setIsSave} name={name} setName={setName} type={type} setType={setType} /> */}
      {nodes.map((item) => {
        return <Dialog nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange} key={item.id} item={item} />
      })}
      <ReactFlow

        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}

        // nodes={nodes}
        // edges={edges}
        defaultNodes={nodes} // con este parametro se combiernte en dragable
        defaultEdges={defaultEdges}
        defaultEdgeOptions={edgeOptions}
        fitView
        nodeTypes={nodeTypes}
        // nodesDraggable
        connectionLineStyle={connectionLineStyle}
        proOptions
      >
        <Background />

        {/* <Controls /> */}
      </ReactFlow>
      {/* <ReactFlow
        defaultNodes={nodes}
        defaultEdges={defaultEdges}
        defaultEdgeOptions={edgeOptions}
        fitView
        // style={{
        //     backgroundColor: '#D3D2E5',
        // }}
        connectionLineStyle={connectionLineStyle}
        proOptions={proOptions}
        nodesDraggable
        nodeTypes={nodeTypes}
      >
        <Background />
      </ReactFlow> */}
    </div>
  )
}

function Flow() {
  return (<>

    <WorkFlowContent />
  </>)
  returnOld(
    <div className="bg-black-500" style={styles.container}>
      <div style={styles.header}></div>
      <div style={styles.sidebar}>
        un menu
      </div>
      <div style={styles.content}>


        <WorkFlowContent />
      </div>
      <div style={styles.footer}></div>
    </div>
  )
}

export default function Dpp() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}