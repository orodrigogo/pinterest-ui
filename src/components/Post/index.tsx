import { useEffect, useState } from "react"
import { Image, Text, View } from "react-native"
import { Feather } from "@expo/vector-icons"

import { PostProps } from "./post"
import { styles } from "./styles"
import { colors } from "@/theme/colors"

type Props = {
  post: PostProps
}

export function Post({ post }: Props) {
  const [aspectRatio, setAspectRatio] = useState(1)

  useEffect(() => {
    if (post.image) {
      Image.getSize(post.image, (width, height) => {
        setAspectRatio(width / height)
      })
    }
  }, [])

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: post.image }}
        style={[styles.image, { aspectRatio }]}
      />

      <View style={styles.footer}>
        <Text style={styles.title}>{post.title}</Text>
        <Feather name="more-horizontal" size={16} color={colors.white} />
      </View>
    </View>
  )
}
