import React, { useState, useEffect, useCallback } from 'react'
import { Box, Divider, Input, Spinner, Text } from 'native-base'
import { SearchIcon, BackIcon, SadIcon } from '../../utils/icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { searchOrganizations } from '../../api/api-search';
import { Params } from '../../models/Params'

import Container from '../../components/Container'

interface IRoute {
  params: { query: string }
  name: string
  key: string
}

export default function SearchScreen (): JSX.Element {
  const { params }: IRoute = useRoute()

  const { goBack } = useNavigation()

  const [query, setQuery] = useState(params.query)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [organization, setOrganization] = useState<Params | null>(null)

  const handleSearch = async (): Promise<void> => {
    setLoading(true)
    setError(false)
    setOrganization(null)

    try {
      const response = await searchOrganizations(query)

      if (response === null) {
        setOrganization(null)
      } else {
        setOrganization(response)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearch() 
  }, [])

  const Dados = useCallback((): JSX.Element => {
    //Carregamento dos dados
    if (loading) {
      return (
        <Box flex={0.8} justifyContent='center'>
          <Spinner />
        </Box>
      )
    }

    //Caso retorne erro
    if (error) {
      return (
        <Box flex={0.8} justifyContent='center' alignItems='center'>
          <SadIcon width={20} height={20} />
          <Text textAlign='center'>Oops! Aconteceu um erro inesperado ao procurar a organização.</Text>
        </Box>
      )
    }

    if (organization != null) {
      return (
        <Container organization={organization} />
      )
    }

    return (
      <Box flex={0.8} justifyContent='center' alignItems='center'>
        <SadIcon width={20} height={20} />
        <Text textAlign='center'>Oops! Não encontramos organizações com este nome.</Text>
      </Box>
    )
  }, [loading, error, organization])

  return (
    <Box bg='background.50' paddingX={5} paddingY={4} flex={1} alignItems='center'>
      <Input
        bg='white.50'
        placeholder='Procurar organizações...'
        placeholderTextColor='grey.50'
        fontFamily='regular'
        borderRadius='md'
        InputLeftElement={
          <BackIcon
            onPress={goBack}
            width={36}
            height={36}
            style={{
              margin: 8
            }}
          />
        }
        InputRightElement={
          <SearchIcon
            width={36}
            height={36}
            style={{
              margin: 8
            }}
          />
        }
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />

      <Divider height={10} bg='background.50' />

      <Dados />

    </Box>
  )
}
