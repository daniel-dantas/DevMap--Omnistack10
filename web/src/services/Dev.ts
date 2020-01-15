import api from './api'

import Dev from '../utils/types/DevType'

export default {
  addDev:  (dev: Dev) : Dev => {

    const response = api.post('/devs', dev).then(response => {
      
      return response.data
    }).catch(erro => {
      return null
    })
    // Fazendo casting
    return response as unknown as Dev
  },
  readDevs: () : [Dev] => {
    const response = api.get('/devs').then(response => {
      return response.data
    }).catch( erro => {
      return null
    })

    return response as unknown as [Dev]
  }
}