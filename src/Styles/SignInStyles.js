import { StyleSheet } from "react-native";
import { colors, sizes } from "../Theme/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    height: "55%",
    padding: sizes.sm,
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    fontSize: sizes.lg,
    paddingBottom: sizes.sm,
    fontFamily: "RobotoLight",
  },
  forgotPassword: {
    color: "#6d6d6d",
    fontSize: sizes.sm,
    paddingTop: sizes.sm / 3,
    fontFamily: "RobotoRegular",
  },
});
