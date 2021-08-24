import React from 'react'
import { Heading, Text } from 'native-base'
import { Icon } from '../../utils/icons'

export default function Header () {
  return (
    <>
      <Icon
        width={25}
        height={25}
        style={{
          marginTop: 20,
          marginBottom: 4
        }}
      />

      <Heading fontSize='xl' fontFamily='medium'>
        Organizações em destaque
      </Heading>

      <Text fontSize='sm' color='grey.50' fontFamily='regular'>
        Veja as organizações em tendência no Github.
      </Text>
    </>
  )
}
