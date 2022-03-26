import { StyleSheet } from "react-native";
import { colors, sizes } from "../Theme/index";

export default StyleSheet.create({
  button: {
    width: "100%",
    height: sizes.xxl,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizes.md,
    shadowColor: colors.main,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
  successButton: {
    shadowColor: colors.success,
  },
  errorButton: {
    shadowColor: colors.error,
  },
  gradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: sizes.md,
  },
  buttonName: {
    textTransform: "uppercase",
    fontSize: sizes.sm,
    fontFamily: "RobotoRegular",
  },
  signIn: {
    backgroundColor: colors.white,
    shadowColor: colors.white,
  },
  signInText: {
    color: colors.black,
  },
  signUp: {
    shadowColor: colors.main,
  },
  signUpText: {
    color: colors.white,
  },
});
