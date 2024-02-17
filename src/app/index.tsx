import { useEffect } from "react"
import { StyleSheet, View, useWindowDimensions } from "react-native"
import { Skeleton } from "moti/skeleton"
import { router } from "expo-router"

import Animated, {
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  runOnJS,
} from "react-native-reanimated"

import { theme } from "@/theme"

export default function Splash() {
  const logoScale = useSharedValue(1)
  const logoPositionY = useSharedValue(0)
  const contentDisplay = useSharedValue(0)

  const dimensions = useWindowDimensions()

  const skeletonColors = [
    theme.colors.gray[600],
    theme.colors.gray[700],
    theme.colors.gray[600],
  ]

  const logoAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { translateY: logoPositionY.value },
    ],
  }))

  const contentAnimatedStyles = useAnimatedStyle(() => ({
    display: contentDisplay.value === 1 ? "flex" : "none",
  }))

  function logoAnimation() {
    logoScale.value = withSequence(
      withTiming(0.7),
      withTiming(1.3),
      withTiming(1, undefined, (finished) => {
        if (finished) {
          logoPositionY.value = withSequence(
            withTiming(50, undefined, () => (contentDisplay.value = 1)),
            withTiming(-dimensions.height, { duration: 400 })
          )

          runOnJS(onEndSplash)()
        }
      })
    )
  }

  function filters() {
    return Array.from({ length: 10 }).map((_, index) => (
      <Skeleton
        key={index}
        width={60}
        height={26}
        radius={6}
        colors={skeletonColors}
      />
    ))
  }

  function boxes(column: "right" | "left") {
    const rest = column === "left" ? 0 : 1

    return Array.from({ length: 20 })
      .filter((_, index) => index % 2 === rest)
      .map((_, index) => {
        const height = index % 2 === (column === "left" ? 0 : 1) ? 200 : 300

        return (
          <Animated.View key={index} style={[styles.box, { height }]}>
            <Skeleton colors={skeletonColors} width="100%" height={height} />
          </Animated.View>
        )
      })
  }

  function onEndSplash() {
    setTimeout(() => {
      router.push("/(tabs)")
    }, 2000)
  }

  useEffect(() => {
    logoAnimation()
  }, [])

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("@/assets/logo.png")}
        style={[styles.logo, logoAnimatedStyles]}
      />

      <Animated.View
        style={[styles.content, contentAnimatedStyles]}
        entering={SlideInDown.duration(700)}
      >
        <View style={styles.header}>{filters()}</View>

        <View style={styles.boxes}>
          <View style={styles.column}>{boxes("left")}</View>
          <View style={styles.column}>{boxes("right")}</View>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  logo: {
    width: 64,
    height: 64,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    gap: 16,
    paddingBottom: 12,
  },
  boxes: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },
  box: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: theme.colors.gray[600],
  },
  column: {
    flex: 1,
    gap: 12,
  },
  content: {
    flex: 1,
    width: "100%",
  },
})
