import { theme } from "@/theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  pressable: {
    paddingBottom: 6,
  },
  text: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: theme.fontFamily.medium,
  },
  pressableSelected: {
    borderBottomWidth: 4,
    borderBottomColor: theme.colors.white,
  },
})
