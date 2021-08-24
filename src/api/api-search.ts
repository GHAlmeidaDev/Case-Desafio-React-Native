//Endpoint para busca
import { Params } from '../models/Params'

const URL = 'https://api.github.com'


const searchOrganizations = async (org: string): Promise<Params | null> => {
  const response = await fetch(`${URL}/orgs/${org}`)

  const data: Params = await response.json()

  if (data.message != null) {
    return null
  } else {
    return data
  }
}

export {searchOrganizations} 
