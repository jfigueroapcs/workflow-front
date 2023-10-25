import { useEffect, useState } from "react"

export default function List() {

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`http://localhost:1337/workflow`)
      .then(res => res.json())
      .then(data => {
        setLoading(false)

        if (data.success) {
          setList(data.data)
        }

        if (!data.success) {
          setError(data.messaje)
        }

        console.log('-------------->', data)
      })
  }, [])

  // console.log(list)
  return (<>
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          
          {loading && <tr><td><p>Loading...</p></td></tr>}
          {list.map((item, idx) => (
            <tr key={idx}>
              <th>1</th>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <div className="join">
                  <a className="btn join-item btn-sm font-normal normal-case" href={`/workflow/${item.slug}`}>View</a>
                  <a className="btn join-item btn-sm font-normal normal-case">Delete</a>
                  {/* <button className="btn join-item btn-sm font-normal normal-case">Button</button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  </>)
}