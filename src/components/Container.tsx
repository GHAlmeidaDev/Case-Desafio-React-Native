import React, { useState, useEffect, useContext } from 'react'
import { Alert, Linking } from 'react-native'
import { Button, Box, Divider, Image, Text, Pressable } from 'native-base'
import { Params } from '../models/Params'
import { Salvo, Salvar } from '../utils/icons'
import { Context } from '../contexts/Context'

interface ICard {
  organization: Params
}

export default function Container ({ organization }: ICard): JSX.Element {
  const { organizations, saved, deleteSave } = useContext(Context)

  const [salvo, setSalvo] = useState(false)

  useEffect(() => {
    const found = organizations.find(val => val.id === organization.id)
    setSalvo(Boolean(found))
  }, [])

  //Salvar organização
  const save = async (): Promise<void> => {
    setSalvo(state => !state)

    if (salvo) {
      await deleteSave(organization)
    } else {
      await saved(organization)
    }
  }

  //Abrir via browser
  const openBrowser = (): void => {
    Alert.alert('Acesso via Browser', '', [
      {
        text: 'Cancelar',
        onPress: () => null
      },
      { text: 'OK', onPress: async () => await Linking.openURL(`https://github.com/${organization.login}`) }
    ])
  }

  return (
    <Pressable
      onPress={openBrowser}
      bg='white.50'
      borderRadius={10}
      px={2}
      py={4}
      w='87%'
      shadow={2}
      flexDirection='row'
      justifyContent='space-between'
    >
      <Image
        source={{uri: `${organization.avatar_url}`}}
        width={20}
        height={20}
        borderRadius={10}
        alt={`${organization.login}`}
      />

      <Divider width={5} bg='white.50' />

      <Box width={0} flexGrow={1}>
        <Text color='blue.50'>
          {organization.login}
        </Text>

        <Text color='grey.50'>
          {organization.description ?? ''}
        </Text>

        <Button
          onPress={save}
          //ternário condicional alteração entre botões
          startIcon={salvo ? <Salvar width={20} height={20} color='white'/> : <Salvo width={20} height={20} color='white'/>}
          borderRadius='md'
          alignSelf='flex-end'
          flexGrow={1}
          marginRight='4'
          bgColor={salvo ? 'blue.50' : 'blueLow.50'}>
          <Text color={salvo ? 'white.50' : 'blue.50'}>
            {salvo ? 'Salvo' : 'Salvar'}
          </Text>
        </Button>
      </Box>
    </Pressable>
  )
}
