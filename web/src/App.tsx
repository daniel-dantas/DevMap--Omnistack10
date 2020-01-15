import React,{useState, useEffect} from 'react'

import Devs from './services/Dev'
import DevType from './utils/types/DevType'


import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

export default function App() {

  const [devs, setDevs] = useState<[DevType]>()
  

  

  useEffect(() => {
    async function loadDevs(){
      const devs = await Devs.readDevs()
      setDevs(devs)
    }

    loadDevs()
  }, [])

  const  handleAddDev: any = async(data: DevType) => {
    

    const Dev: DevType = await Devs.addDev(data)
    
    console.log(Dev)
    
    setDevs(await Devs.readDevs())

  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {(devs?.map(dev => (
            <DevItem key={dev.github_username} dev={dev}/>
          )))}
        </ul>
      </main>
    </div>
  )
}
