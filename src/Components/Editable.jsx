import { useState, useCallback } from 'react'

const Editable = ({id, name}) => {
  // console.log('id >', id)
  const [text, setText] = useState(name)
  const onContentBlur = useCallback(evt => setContent(evt.currentTarget.innerHTML))
  return <div style={{zIndex: 999}} contentEditable onBlur={onContentBlur} dangerouslySetInnerHTML={{__html: text}}/>
}

export default Editable