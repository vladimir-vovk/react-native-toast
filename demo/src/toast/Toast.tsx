import React, {
  ReactElement,
  useEffect,
  useRef,
  useCallback,
  useState
} from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { useToast } from './useToast'

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 64,
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

const FADE_DURATION = 300
const MOVE_DURATION = 15

export const Toast = (): ReactElement => {
  const { toast, hideToast } = useToast()
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(0)).current
  const timer = useRef<number>()
  const [isVisible, setVisible] = useState(false)

  const fadeIn = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: FADE_DURATION,
      useNativeDriver: true
    }).start()
    Animated.timing(translateY, {
      toValue: -MOVE_DURATION,
      duration: FADE_DURATION,
      useNativeDriver: true
    }).start()
  }, [opacity])

  const fadeOut = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: FADE_DURATION,
      useNativeDriver: true
    }).start(() => hideToast())
    Animated.timing(translateY, {
      toValue: 0,
      duration: FADE_DURATION,
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
      style={[styles.container, { opacity, transform: [{ translateY }] }]}
    >
      <View style={styles.toast}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  )
}
