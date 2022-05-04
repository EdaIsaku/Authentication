import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
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
  errorMessage,
}) => {
  const [hasFocus, setFocus] = useState(false);
  return (
    <View>
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
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          onChangeText={(val) => handleChangeText(val, name)}
        />
        <Icon
          style={[
            styles.icon,
            hasFocus ? styles.focus : "",
            isSuccess ? styles.successIcon : isError ? styles.errorIcon : "",
          ]}
          name={isSuccess ? "check" : isError ? "exclamation" : iconName}
        />
      </View>
      <Text
        style={[styles.errorMessage, isError ? styles.showErrorMessage : ""]}
      >
        * {errorMessage}
      </Text>
    </View>
  );
};

export default CutomInput;
