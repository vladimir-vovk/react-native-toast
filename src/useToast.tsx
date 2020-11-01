import React from 'react'
import { ToastContext } from './ToastProvider'

export function useToast() {
  return React.useContext(ToastContext)!
}
