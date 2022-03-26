import { StyleSheet } from "react-native";
import { colors, sizes } from "../Theme/index";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  opacityContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: sizes.sm / 2,
  },
  titleContainer: {
    paddingVertical: sizes.xxxl,
    paddingHorizontal: sizes.sm,
  },
  title: {
    color: colors.white,
    fontSize: sizes.xxxl,
    textTransform: "capitalize",
    textAlign: "center",
    lineHeight: sizes.xxxl,
    fontFamily: "RobotoRegular",
    letterSpacing: -1,
  },
  buttonsContainer: {
    width: "100%",
    height: "18%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: sizes.sm / 2,
  },
});
