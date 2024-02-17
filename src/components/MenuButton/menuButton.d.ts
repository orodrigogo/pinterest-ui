import { FontAwesome } from "@expo/vector-icons"

export type MenuButtonProps = {
  title: string
  icon: keyof typeof FontAwesome.glyphMap
}
