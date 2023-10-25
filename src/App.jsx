import { useState, useCallback } from 'react'
import { Link, Route } from 'wouter'

import './App.css'
// import Epp from './examples/Epp' //todos los ejemplos que fui haciendo de la documentacion
// import Workflow from './workflowZustand/Workfow'
// import Workflow from './workflow2/Workfow'
// import Workflow from './Workflow/workflow'
// import Workflow from './workflowEC'

import Editable from './Components/Editable'
import Nav from './Components/Nav'

import List from './routes/List'
import Workflow from './routes/workflow'

const App = () => {
  // const [text, setText] = useState('Editable')
  // const onContentBlur = useCallback(evt => setContent(evt.currentTarget.innerHTML))

  
  return(
    <>
    {/* <Editable name={`Juan C`} /> */}
    {/* <div contentEditable onBlur={onContentBlur} dangerouslySetInnerHTML={{__html: text}}/> */}
      {/* <Workflow /> */}
      <Nav />
      <Route path="/"><List /></Route>
      <Route path="/workflow/:slug" component={Workflow} />
      {/* <Route path="/detail/:slug" component={Workflow} /> */}
    </>
  )
}


export default App
