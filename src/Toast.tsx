import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

import { useToast } from './useToast'

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    marginHorizontal: 20,
    maxWidth: 480
  },
  toast: {
    borderRadius: 6,
    padding: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  message: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white'
  }
})

const MOVE_DURATION = 8

export const Toast = (): ReactElement => {
  const { toast, hideToast } = useToast()
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(0)).current
  const timer = useRef<number>()
  const [isVisible, setVisible] = useState(false)
  const duration = toast.animationDuration

  const fadeIn = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true
    }).start()
    Animated.timing(translateY, {
      toValue: (toast.top ? -1 : 1) * MOVE_DURATION,
      duration,
      useNativeDriver: true
    }).start()
  }, [opacity])

  const fadeOut = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration,
      useNativeDriver: true
    }).start(() => hideToast())
    Animated.timing(translateY, {
      toValue: 0,
      duration,
      useNativeDriver: true
    }).start()
  }, [opacity, hideToast])

  useEffect(() => {
    if (toast.isVisible && !isVisible) {
      setVisible(true)
      fadeIn()

      const { timeout } = toast
      if (timeout) {
        if (timer.current) {
          clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
          hideToast()
        }, timeout)
      }
    }

    if (!toast.isVisible && isVisible) {
      setVisible(false)
      fadeOut()
    }
  }, [toast, isVisible, fadeIn, fadeOut])

  const { message } = toast

  return (
    <Animated.View
      style={[
        styles.container,
        toast.top ? { top: toast.top } : { bottom: toast.bottom },
        { opacity, transform: [{ translateY }] }
      ]}
    >
      <View style={[styles.toast, toast.containerStyle]}>
        <Text style={[styles.message, toast.textStyle]}>{message}</Text>
      </View>
    </Animated.View>
  )
}
