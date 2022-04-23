import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import CutomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import styles from "../Styles/SignInStyles";
import { stringContainsNumberSymbols, fetchRequest } from "../../utils/utils";

const SignIn = ({ navigation }) => {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [error, setIsError] = useState({
    email: false,
    password: false,
  });
  const [success, setIsSuccess] = useState({
    email: false,
    password: false,
  });

  const handleButtonPress = () => {
    if (validateSignInData(signInData)) {
      fetchRequest("http://192.168.0.104:3000/signIn", signInData)
        .then((res) => res.json())
        .then((res) => {
          if (res.msg == "Successfully loged In") {
            navigation.navigate("Map");
          } else if (res.msg == "Password incorrect!") {
            navigation.navigate("Result", {
              result: "error",
              msg: "Password incorrect.",
              btnName: "Try Again",
              nav: "SignIn",
            });
          } else {
            navigation.navigate("Result", {
              result: "error",
              msg: "No user with that email!",
              btnName: "Try Again",
              nav: "SignIn",
            });
          }
        });
    }
  };
  const handleForgotPassword = () => {
    navigation.navigate("ResetPassword");
  };
  const handleChangeText = (txt, name) => {
    setIsError((prevState) => ({
      ...prevState,
      [name]: false,
    }));
    setIsSuccess((prevState) => ({
      ...prevState,
      [name]: false,
    }));
    setSignInData({
      ...signInData,
      [name]: txt,
    });
  };
  const validatePassword = (password) => {
    if (password.length < 6) {
      setIsError((prevState) => ({
        ...prevState,
        password: true,
      }));
      setIsSuccess((prevState) => ({
        ...prevState,
        password: false,
      }));
      console.log("Password is too short!");
      return false;
    } else if (stringContainsNumberSymbols(password)) {
      setIsError((prevState) => ({
        ...prevState,
        password: false,
      }));
      setIsSuccess((prevState) => ({
        ...prevState,
        password: true,
      }));
      console.log("Success!");
      return true;
    }
  };
  const validateEmail = (email) => {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (regex.test(email)) {
      setIsSuccess((prevState) => ({
        ...prevState,
        email: true,
      }));
      setIsError((prevState) => ({
        ...prevState,
        email: false,
      }));
      console.log("Success");
      return true;
    } else {
      setIsSuccess((prevState) => ({
        ...prevState,
        email: false,
      }));
      setIsError((prevState) => ({
        ...prevState,
        email: true,
      }));
      console.log("Incorrect email");
      return false;
    }
  };
  const validateSignInData = (signInData) => {
    if (
      validateEmail(signInData.email) &&
      validatePassword(signInData.password)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const inputs = [
    {
      placeholder: "Email Address",
      name: "email",
      iconName: "envelope",
    },
    {
      placeholder: "Password",
      name: "password",
      iconName: "lock",
      isSecured: true,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Sign In</Text>
        {inputs.map((el, idx) => {
          return (
            <CutomInput
              key={idx}
              placeholder={el.placeholder}
              isSecured={el.isSecured}
              handleChangeText={handleChangeText}
              name={el.name}
              iconName={el.iconName}
              isError={error[`${el.name}`]}
              isSuccess={success[`${el.name}`]}
            />
          );
        })}
        <CustomButton
          btnName={"Sign In"}
          dark={true}
          handleButtonPress={handleButtonPress}
        />
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
