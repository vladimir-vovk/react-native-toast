import React, { ReactElement, useState, createContext } from 'react'

type Toast = {
  message: string
  timeout: number
  isVisible: boolean
}

const defaultToast = {
  message: '',
  timeout: 0,
  isVisible: false
}

type ToastContextType = {
  toast: Toast
  showToast: (message: string, timeout?: number) => void
  hideToast: () => void
}

export const ToastContext = createContext<ToastContextType | null>(null)

type ToastConfig = {
  timeout: number
}

const DEFAULT_CONFIG: ToastConfig = {
  timeout: 3000
}

type Props = {
  children: ReactElement | ReactElement[]
  config?: ToastConfig
}

export const ToastProvider = ({
  children,
  config = DEFAULT_CONFIG
}: Props): ReactElement => {
  const [toast, setToast] = useState<Toast>(defaultToast)

  function showToast(message: string, timeout = config.timeout) {
    setToast({ message, timeout, isVisible: true })
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
