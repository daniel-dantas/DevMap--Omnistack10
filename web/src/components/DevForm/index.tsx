import React, {useState, useEffect} from 'react';

import './styles.css';

interface Props{
  onSubmit: Function
}

export default function DevForm(props: Props) {

  const { onSubmit } = props

  const [github_username, setGithub_username] = useState<string>('')
  const [techs, setTechs] = useState<string>('')
  const [latitude, setLatitude] = useState<number>(0)
  const [longitude, setLongitude] = useState<number>(0)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords
        setLatitude(latitude)
        setLongitude(longitude)        
      },
      erro => {
        console.log(erro)
      },
      {
        timeout: 30000
      }
    )
  }, [])

  const handleSubmit: any = async(event: Event) => {
    event.preventDefault()
    await onSubmit(
      {github_username, techs, latitude, longitude}
    )
    setGithub_username('')
    setTechs('')

  }

  return (
    <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do github</label>
            <input 
              type="text" 
              name="github_username" 
              id="github_username"
              value={github_username}
              onChange={event => setGithub_username(event.target.value)}
              required
            />
          </div>
          <div className="input-block">
            <label htmlFor="tecnologias">Tecnologias</label>
            <input 
              type="text" 
              name="tecnologias" 
              id="tecnologias"
              value={techs}
              onChange={event => setTechs(event.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                value={latitude} 
                onChange={event => setLatitude(parseFloat(event.target.value))} 
                type="text" 
                name="latitude" 
                id="latitude"
                required
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                value={longitude} 
                onChange={event => setLongitude(parseFloat(event.target.value))} 
                type="text" 
                name="longitude" 
                id="longitude"
                required
              />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
  )
}
