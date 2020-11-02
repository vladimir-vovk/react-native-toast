import React from 'react'
import { ToastProvider, Toast } from '@vladimir-vovk/react-native-toast'
import Demo from './src/Demo'

export default function App() {
  return (
    <ToastProvider config={{ timeout: 2000 }}>
      <Demo />
      <Toast />
    </ToastProvider>
  )
}
