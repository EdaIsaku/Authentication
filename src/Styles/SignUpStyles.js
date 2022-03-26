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
    height: "70%",
    padding: sizes.sm,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: sizes.lg,
    paddingBottom: sizes.sm,
    fontFamily: "RobotoLight",
  },
  textContainer: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    fontSize: sizes.xs,
    color: colors.second,
  },
  signIn: {
    fontSize: sizes.xs,
    paddingLeft: sizes.sm / 2,
    color: colors.main,
  },
});
