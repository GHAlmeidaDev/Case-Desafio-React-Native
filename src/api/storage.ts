import AsyncStorage from '@react-native-async-storage/async-storage'
import { Params } from '../models/Params'


const STORAGE = '@save' //Chave AsyncStorage

//Puxar informações salvas
const getStorage = async (): Promise<Params[]> => {
  const save = await AsyncStorage.getItem(STORAGE)

  let saveOrg: Params[] = []

  if (save != null) {
    saveOrg = JSON.parse(save)
  }

  return saveOrg
}

//Jogar informações para o cache
const saveORG = async (org: Params): Promise<void> => {
  const save = await AsyncStorage.getItem(STORAGE)

  let saveOrg: Params[] = []

  if (save != null) {
    saveOrg = JSON.parse(save)
  }

  const existe = saveOrg.includes(org)

  if (!existe) {
    saveOrg.push(org)
  }

  await AsyncStorage.setItem(STORAGE, JSON.stringify(saveOrg))
}

//Excluir conteúdo da memória
const SaveDelete = async (org: Params): Promise<void> => {
  const save = await AsyncStorage.getItem(STORAGE)

  let saveOrg: Params[] = []

  if (save != null) {
    saveOrg = JSON.parse(save)
  }

  const newArray = saveOrg.filter(savedOrg => savedOrg.id !== org.id)

  await AsyncStorage.setItem(STORAGE, JSON.stringify(newArray))
}

export { getStorage, saveORG, SaveDelete }
