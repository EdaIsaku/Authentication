import { StyleSheet } from "react-native";
import { colors, sizes } from "../Theme/index";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "85%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    fontSize: sizes.md,
    color: colors.red,
  },
  modalTitle: {
    color: "#4f4f4f",
    fontFamily: "RobotoLight",
    fontSize: sizes.sm,
    letterSpacing: 0.5,
    padding: 5,
  },
  imageContainer: {
    width: "100%",
    height: "55%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  uploadPhotoBtn: {
    position: "absolute",
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cameraBtn: {
    width: 60,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  iconContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(209, 209, 209, 0.7)",
  },
  deleteImageIcon: {
    position: "absolute",
    top: 5,
    right: 15,
    color: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  button: {
    borderRadius: 5,
    width: 120,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonName: {
    color: "white",
    textAlign: "center",
    fontFamily: "RobotoLight",
    fontSize: sizes.sm,
  },
});
