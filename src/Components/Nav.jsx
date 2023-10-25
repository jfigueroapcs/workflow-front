import { useState } from "react"
import { useLocation } from "wouter"
import { getSlug } from '../Utils/getSlug'

export default function Nav() {
  const [name, setName] = useState('')
  const [errMsj, setErrMsj] = useState('')
  const [location, setLocation] = useLocation();

  const updateName = (e) => {
    setName(e.target.value)
  }

  const create = async () => {
    // console.log(document.getElementById('my_modal_1'))
    await fetch(`http://localhost:1337/workflow`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: name })
      })
      .then(res => res.json())
      .then(d => {
        console.log('===>', d)
        if (d.success) {
          // console.log(d)
          setLocation(`/workflow/${d.data.slug}`)
          const bb = document.getElementById('clesed')
          // console.log(bb)
          bb.click()
        }
        // console.log(d)
        setErrMsj('A workflow with the same name already exists')
      })


    // await fetch(`http://localhost:1337/workflow/${getSlug(name)}`)
    //   .then(res => res.json())
    //   .then(async data => {
    //     // console.log(data)
    //     if (!data.success) {

    //       // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //     }

    //     // console.log(data)
    //     setErrMsj('A workflow with the same name already exists')

    //   })
    // console.log(bb)
  }

  return (<>
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          {/* <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label> */}

        </div>
        <a className="btn btn-ghost normal-case text-xl" href="/">WorkFlow</a>
      </div>
      <div className="navbar-end">
        <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>Create</button>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">New WorkFlow!</h3>
          {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
          {/* <form action="/create"> */}
          <div className="flex flex-row justify-between">
            <input type="text" placeholder="Type here" className="input input-ghost input-sm w-full max-w-xs"
              value={name}
              onChange={e => updateName(e)}
            />

            <div className="flex flex-row-reverse pl-4">
              {/* <button className="btn btn-outline btn-sm justify-self-end" onClick={()=> setLocation(`/create/${getSlug(name)}`)}>save</button> */}
              <button className="btn btn-outline btn-sm justify-self-end" onClick={() => create()}>save</button>
            </div>
          </div>
          <span className="text-red-500">{errMsj}</span>

          <form method="dialog">
            <div className="modal-action">
              <button id="clesed" className="btn btn-outline btn-sm justify-self-end">Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </div >
  </>)
}