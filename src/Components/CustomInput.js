import React from "react";
import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "../Styles/CustomInputStyles";

const CutomInput = ({
  placeholder,
  name,
  iconName,
  handleChangeText,
  isSecured = false,
  isSuccess = false,
  isError = false,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          isSuccess ? styles.success : isError ? styles.error : "",
        ]}
        placeholderTextColor="#d3d3d3"
        secureTextEntry={isSecured}
        placeholder={placeholder}
        name={name}
        keyboardType={name == "email" ? "email-address" : "default"}
        autoCapitalize={name == "email" ? "none" : "words"}
        onChangeText={(val) => handleChangeText(val, name)}
      />
      <Icon
        style={[
          styles.icon,
          isSuccess ? styles.successIcon : isError ? styles.errorIcon : "",
        ]}
        name={isSuccess ? "check" : isError ? "exclamation" : iconName}
      />
    </View>
  );
};

export default CutomInput;
