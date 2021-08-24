import React, { createContext, ReactChild, useEffect, useState } from 'react'
import { getStorage, saveORG, SaveDelete } from '../api/storage'
import { Params } from '../models/Params'


interface ISave {
  organizations: Params[]
  saved: (org: Params) => Promise<void>
  deleteSave: (org: Params) => Promise<void>
}

export const Context = createContext<ISave>({} as ISave) 

interface ISavedProps {
  children: ReactChild
}

export function Saved ({ children }: ISavedProps): JSX.Element {
  const [organizations, setOrganizations] = useState<Params[]>([])

  //Puxar informações
  const get = async (): Promise<void> => {
    const response = await getStorage()
    setOrganizations(response)
  }

  //Salvar informações
  const saved = async (org: Params): Promise<void> => {
    setOrganizations(state => [...state, org])
    await saveORG(org)
  }

  //Excluir informações
  const deleteSave = async (org: Params): Promise<void> => {
    setOrganizations(state => state.filter(val => val.id !== org.id))
    await SaveDelete(org)
  }

  useEffect(() => {
    get() 
  }, [])

  return (
    <Context.Provider value={{ organizations, saved, deleteSave }}>
      {children}
    </Context.Provider>
  )
}
