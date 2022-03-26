import { StyleSheet } from "react-native";
import { colors, sizes } from "../Theme/index";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: sizes.xl,
  },
  input: {
    width: "100%",
    height: "100%",
    borderRadius: sizes.xl,
    paddingLeft: sizes.sm,
    backgroundColor: colors.shadow,
    fontSize: sizes.sm,
    fontFamily: "RobotoRegular",
  },
  icon: {
    position: "absolute",
    right: sizes.md,
    color: "#d3d3d3",
    fontSize: sizes.sm,
  },
  error: {
    shadowColor: colors.error,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  errorIcon: {
    color: colors.error,
  },
  success: {
    shadowColor: colors.success,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  successIcon: {
    color: colors.success,
  },
});