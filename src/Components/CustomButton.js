import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../Styles/CustomButtonStyles";

const CustomButton = ({
  btnName,
  dark,
  handleButtonPress,
  success = false,
  error = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        dark || success || error ? styles.signUp : styles.signIn,
        success ? styles.successButton : error ? styles.errorButton : "",
      ]}
      onPress={handleButtonPress}
    >
      {dark ? (
        <LinearGradient
          style={styles.gradient}
          colors={["#9733EE", "#DA22FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      ) : success ? (
        <LinearGradient
          style={styles.gradient}
          colors={["#124400", "#00d34f"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      ) : error ? (
        <LinearGradient
          style={styles.gradient}
          colors={["#a50000", "#ff0000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      ) : null}
      <Text
        style={[
          styles.buttonName,
          dark || success || error ? styles.signUpText : styles.signInText,
        ]}
      >
        {btnName}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
