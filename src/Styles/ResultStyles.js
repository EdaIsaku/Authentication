import { StyleSheet } from "react-native";
import { colors, sizes } from "../Theme/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: sizes.lg,
    paddingVertical: sizes.xxl,
  },
  iconContainer: {
    width: sizes.xxxxl,
    height: sizes.xxxxl,
    borderRadius: sizes.xxxl,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  successIconContainer: {
    borderColor: colors.success,
  },
  errorIconContainer: {
    borderColor: colors.error,
  },
  icon: {
    fontSize: sizes.xxl,
  },
  successIcon: {
    color: colors.success,
  },
  errorIcon: {
    color: colors.error,
  },
  messageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: sizes.xl,
    color: "#606060",
    fontWeight: "500",
    letterSpacing: -0.5,
    paddingBottom: sizes.sm / 2,
  },
  subtitle: {
    fontSize: sizes.sm,
    fontWeight: "200",
  },
});
