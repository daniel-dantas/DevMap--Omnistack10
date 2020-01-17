import api from './api'
import Dev from '../utils/types/DevType'
import { Region } from 'react-native-maps'

interface Search{
  latitude: number,
  longitude: number,
  techs: string
}

export default {
  searchDevs: (search: Search) : [Dev] => {
    const response = api.get('/search', {
      params: search
    }).then(response => {
      return response.data.devs
    }).catch( erro => {
      return null
    })

    return response as unknown as [Dev]
  },
  
}