import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Box, Divider, Text, FlatList, Input } from 'native-base'
import { BackIcon, SadIcon, IconGrey, SearchIcon } from '../../utils/icons'
import { useNavigation } from '@react-navigation/native'
import Container from '../../components/Container'
import { Params } from '../../models/Params'

import { Context } from '../../contexts/Context'
import Filter from './Filter'

export default function Saved (): JSX.Element {

  const { goBack } = useNavigation()
  const { organizations } = useContext(Context)

  const [input, setInput] = useState('')
  const [search, setSearch] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [filters, setFilters] = useState<String[]>([])
  const [filteredOrganizations, setFilteredOrganizations] = useState<Params[]>([])

  const getFilteredOrgs = async (): Promise<void> => {
    setNotFound(false)

    const filtered: Params[] = []

    filters.forEach(val => {
      for (const org of organizations) {
        if (org.login === val.toLowerCase()) {
          filtered.push(org)
        }
      }
    })

    if (filtered.length === 0) {
      setNotFound(true)
    } else {
      setFilteredOrganizations(filtered)
    }
  }

  const handleAddFilter = (): void => {
    setFilters(state => [...state, input])
    setSearch(false)
    setInput('')
  }

  const close = (filter: String): void => {
    setNotFound(false)
    setFilters(state => state.filter(val => val !== filter))
  }

  useEffect(() => {
    if (filters.length > 0) {
      getFilteredOrgs() 
    } else {
      setFilteredOrganizations([])
    }
  }, [filters])

  const DisplayData = useCallback((): JSX.Element | null => {
    if (notFound) {
      return (
        <>
          {filters.map((filter, index) => <Filter filter={filter} key={index} close={() => close(filter)} />)}
          <Divider height={8} bg='background.50' />
          <SadIcon width={20} height={20} />
          <Text textAlign='center'>Oops! Não encontramos organizações com esse nome.</Text>
        </>
      )
    }

    if (filteredOrganizations.length > 0) {
      return (
        <>
          {filters.map((filter, index) => <Filter filter={filter} key={index} close={() => close(filter)} />)}
          <Divider height={8} bg='background.50' />
          <FlatList
            data={filteredOrganizations}
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

    if (organizations.length > 0) {
      return (
        <FlatList
          data={organizations}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Divider height={4} bg='background.50' />}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Container organization={item} />
          )}
        />
      )
    }

    if (organizations.length === 0) {
      return (
        <Text textAlign='center'>
          Sua lista de organizações está vazia. Clique no icone <IconGrey width={20} height={20} color='grey' />
          para salvar uma organização
        </Text>
      )
    }

    return null
  }, [notFound, filters, filteredOrganizations, organizations])

  return (
    <Box bg='background.50' paddingX={5} paddingY={4} flex={1}>
      {search
        ? <Input
          bg='white.50'
          placeholder='Adicionar filtro'
          placeholderTextColor='grey.50'
          fontFamily='regular'
          borderRadius='md'
          autoFocus
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleAddFilter}
          InputLeftElement={
            <BackIcon
              onPress={() => setSearch(false)}
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
        />
        : <Box flexDirection='row' justifyContent='space-between'>
          <Box flexDirection='row' alignItems='center'>
            <BackIcon width={36} height={36} color='white' onPress={goBack} />
            <Divider width={5} bg='background.50' />
            <Text>Suas organizações salvas</Text>
          </Box>
          <SearchIcon width={20} height={20} color='white' onPress={() => setSearch(true)} />
        </Box>}

      <Divider height={10} bg='background.50' />

      <Box flex={1} alignItems='center'>
        <DisplayData />
      </Box>
      
    </Box>
  )
}
