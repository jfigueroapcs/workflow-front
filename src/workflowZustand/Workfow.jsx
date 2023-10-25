
import { useStore } from "./store"

const Flow = () => {
  const {
    // count,
    // increment,
    // decrement,
    nested,
    saveNodes,
    updateNode
  } = useStore()
  // console.log(nested.nodes[0].data.name)

  const update = () => {
    const newNode = {...nested.nodes[0]}
    newNode.data.name = 'Juan C Figueroa M'

    updateNode(newNode)
  }
  
  return (<>
    <p>hello</p>
    {/* <span>{count.num}</span> */}
    <span>{nested.nodes[0].data.name}</span>
    <br />
    <button onClick={saveNodes}>Save</button>
    <br />
    <button onClick={() => update()}>update</button>
    {/* <button onClick={increment}>one up</button>
    <button onClick={decrement}> -one up</button> */}
  </>)
}

export default () => <Flow />