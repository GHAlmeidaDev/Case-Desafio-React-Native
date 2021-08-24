//Endpoint para puxar os dados
import { Params } from '../models/Params'

const URL = 'https://api.github.com'

const getOrganizations = async (): Promise<Params[]> => {
  const response = await fetch(`${URL}/organizations`)

  const data: Params[] = await response.json()

  return data
}

export { getOrganizations }
