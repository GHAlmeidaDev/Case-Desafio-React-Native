import 'react-native-gesture-handler'
import React from 'react'
import { NativeBaseProvider, StatusBar } from 'native-base'
import Navigation from './src/navigation'
import { colors } from './src/utils/colors'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import { Saved } from './src/contexts/Context'

export default function App (): JSX.Element {
  
  //Carregar Fontes
  const [loadFont] = useFonts({
    'Arimo-Medium': require('./assets/fonts/Arimo-Medium.ttf'),
    'Arimo-Regular': require('./assets/fonts/Arimo-Regular.ttf')
  })

  if (!loadFont) {
    return <AppLoading />
  }

  return (
    <NativeBaseProvider theme={colors}>
      <Saved>
        <>
       
          <Navigation />
          <StatusBar barStyle='dark-content' backgroundColor='#FFFFFF' />
        
        </>
      </Saved>
    </NativeBaseProvider>
  )
}
