import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { useToast } from '@vladimir-vovk/react-native-toast'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const Demo = () => {
  const { showToast, hideToast } = useToast()

  const _onShowToast = () => {
    showToast('Hey, I am toast! Hide me :)', 0)
  }

  const _onHideToast = () => {
    hideToast()
  }

  const _onShowToast3 = () => {
    // see ToastProvider config prop
    showToast('I will hide after 2 seconds ;)')
  }

  return (
    <View style={styles.container}>
      <Button title="Show toast" onPress={_onShowToast} />
      <Button title="Hide toast" onPress={_onHideToast} />
      <Button title="Show toast for 2 seconds" onPress={_onShowToast3} />
    </View>
  )
}

export default Demo
