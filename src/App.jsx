import { useEffect} from "react"
import axios from "axios"


function App() {
  useEffect(()=>{
    (async()=>{
      try {
        const res = await axios.get('https://randomuser.me/api/')
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    })()
    },[])

  return (
    <>
    <h1 className="fs-7 fs-lg-2">hello React</h1>
    </>
  )
}

export default App
