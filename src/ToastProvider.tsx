import React, { createContext, ReactElement, useState } from 'react'
import { TextStyle, ViewStyle } from 'react-native'

type Toast = {
  message: string
  timeout: number
  isVisible: boolean
  top?: number
  bottom?: number
  containerStyle?: ViewStyle
  textStyle?: TextStyle
  animationDuration: number
}

type ToastContextType = {
  toast: Toast
  showToast: (message: string, timeout?: number) => void
  hideToast: () => void
}

export const ToastContext = createContext<ToastContextType | null>(null)

type ToastConfig = {
  timeout: number
  containerStyle?: ViewStyle
  textStyle?: TextStyle
  top?: number
  bottom?: number
  animationDuration?: number
}

const ANIMATION_DURATION = 600

const DEFAULT_CONFIG: ToastConfig = {
  timeout: 3000,
  bottom: 64,
  animationDuration: ANIMATION_DURATION
}

const defaultToast: Toast = {
  message: '',
  timeout: 0,
  isVisible: false,
  bottom: 64,
  animationDuration: ANIMATION_DURATION
}

type Props = {
  children: ReactElement | ReactElement[]
  config?: ToastConfig
}

export const ToastProvider = ({ children, config = DEFAULT_CONFIG }: Props): ReactElement => {
  const [toast, setToast] = useState<Toast>(defaultToast)

  function showToast(message: string, timeout = config.timeout) {
    setToast({
      message,
      isVisible: true,
      ...config,
      timeout,
      animationDuration: config.animationDuration || ANIMATION_DURATION
    })
  }

  function hideToast() {
    setToast({ ...toast, isVisible: false })
  }

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  )
}
