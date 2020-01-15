import React from 'react'

import DevType from '../../utils/types/DevType'

import './styles.css';

interface Props{
  dev: DevType
}

export default function DevItem(props: Props) {

  const { dev } = props

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name}/>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no github</a>
    </li>
  )
}
