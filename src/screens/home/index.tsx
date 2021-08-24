import React, { useState, useEffect, useCallback } from 'react'
import { Box, Input, Spinner, Text, FlatList, Divider, Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { SearchIcon, SadIcon, NextIcon } from '../../utils/icons'
import { getOrganizations } from '../../api/api'
import { Params } from '../../models/Params'

import Header from './Header'
import Container from '../../components/Container'

export default function HomeScreen (): JSX.Element {
  const { navigate } = useNavigation()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [query, setQuery] = useState('')

  const [orgs, setOrgs] = useState<Params[]>([])

 
  const handleSearch = (): void => {
    navigate('Search', {
      query
    })

    setQuery('')
  }

  const getOrgs = async (): Promise<void> => {
    try {
      const response = await getOrganizations()

      setOrgs(response)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleGoToSaved = (): void => {
    navigate('Saved')
  }

  useEffect(() => {
    getOrgs() // eslint-disable-line
  }, [])

  const DisplayData = useCallback((): JSX.Element | null => {
    if (loading) {
      return (
        <>
          <Header />
          <Box flex={1} justifyContent='center'>
        
            <Spinner />
         
          </Box>
        </>
      )
    }

    if (error) {
      return (
        <Box flex={0.8} justifyContent='center' alignItems='center'>
          <SadIcon width={20} height={20} />
          <Text textAlign='center'>Oops! Não encontramos organizações com esse nome.</Text>
        </Box>
      )
    }

    if (orgs.length > 0) {
      return (
        <>
          <Header />
          <Divider height={10} bg='background.50' />
          <FlatList
            data={orgs}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <Divider height={4} bg='background.50' />}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Container organization={item} />
            )}
          />
        </>
      )
    }

    return <Header />
  }, [loading, error, orgs])

  return (
    <Box bg='background.50' paddingX={5} paddingY={4} flex={1} alignItems='center'>
      <Input
        bg='white.50'
        placeholder='Procurar organizações...'
        placeholderTextColor='grey.50'
        fontFamily='regular'
        borderRadius='md'
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

      <DisplayData />

      <Button
        onPress={handleGoToSaved}
        endIcon={
          <NextIcon
            width={30}
            height={30}
            color='white'
          />
        }
        pos='absolute'
        right={8}
        bottom={8}
        bg='blue.50'
      >
        <Text color='white.50'>
          Ver salvos
        </Text>
      </Button>

    </Box>
  )
}
