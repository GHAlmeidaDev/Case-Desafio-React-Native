import React from 'react'
import { Box, Text } from 'native-base'
import { CloseIcon } from '../../utils/icons';

interface IFilter {
  filter: String
  close: () => void
}

export default function Filter ({ filter, close }: IFilter): JSX.Element {
  return (
    <Box w='100%' borderRadius='md' px={4} py={4} marginBottom={2} bg='white.50' shadow={2} flexDirection='row' alignItems='center' justifyContent='space-between'>
      <Text>{filter}</Text>
      <CloseIcon width={36} height={36} color='grey' onPress={close} />
    </Box>
  )
}
