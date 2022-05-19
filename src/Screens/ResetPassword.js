import { useState } from "react";
import { View, Text } from "react-native";
import styles from "../Styles/ResetPasswordStyles";

import CutomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import { fetchRequest } from "../../utils/utils";

const ResetPassword = ({ navigation }) => {
  const [error, setIsError] = useState({
    email: false,
    emailMsg: "",
  });
  const [success, setIsSuccess] = useState({
    email: false,
  });

  const [email, setEmail] = useState("");
  const validateEmail = (email) => {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (email.length < 1) {
      setIsError((prevState) => ({
        ...prevState,
        email: true,
        emailMsg: "Email is required",
      }));
      setIsSuccess((prevState) => ({
        ...prevState,
        email: false,
      }));
      return false;
    } else if (regex.test(email)) {
      setIsSuccess((prevState) => ({
        ...prevState,
        email: true,
      }));
      setIsError((prevState) => ({
        ...prevState,
        email: false,
      }));
      return true;
    } else {
      setIsSuccess((prevState) => ({
        ...prevState,
        email: false,
      }));
      setIsError((prevState) => ({
        ...prevState,
        email: true,
        emailMsg: "Please check your email address",
      }));
      return false;
    }
  };
  const handleChangeText = (txt) => {
    setIsError((prevState) => ({
      ...prevState,
      email: false,
    }));
    setIsSuccess((prevState) => ({
      ...prevState,
      email: false,
    }));
    setEmail(txt);
  };
  const handleButtonPress = () => {
    if (validateEmail(email)) {
      fetchRequest("http://192.168.1.205:3000/findOne", { email })
        .then((res) => res.json())
        .then((res) => {
          if (res.msg) {
            navigation.navigate("Result", {
              result: "error",
              msg: "No user with that email registered!.",
              btnName: "Try again",
              nav: "ResetPassword",
            });
          } else {
            console.log(res);
          }
        });
    } else {
      navigation.navigate("ResetPassword");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Reset Your Password.</Text>
        <CutomInput
          placeholder={"Email Address"}
          name="email"
          iconName={"envelope"}
          handleChangeText={handleChangeText}
          isError={error["email"]}
          isSuccess={success["email"]}
          errorMessage={error["emailMsg"]}
        />
        <CustomButton
          btnName={"Reset You Password"}
          dark={true}
          handleButtonPress={handleButtonPress}
        />
      </View>
    </View>
  );
};

export default ResetPassword;
