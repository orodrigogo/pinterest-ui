import { Pressable, Text } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

import { styles } from "./styles"
import { theme } from "@/theme"

import { MenuButtonProps } from "./menuButton"

export function MenuButton({ title, icon }: MenuButtonProps) {
  return (
    <Pressable style={styles.container}>
      <FontAwesome
        name={icon}
        size={32}
        color={theme.colors.white}
        style={styles.icon}
      />
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}
