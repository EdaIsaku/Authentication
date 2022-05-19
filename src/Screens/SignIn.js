import { useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CutomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import styles from "../Styles/SignInStyles";
import { stringContainsNumberSymbols, fetchRequest } from "../../utils/utils";
import { UserStateContext } from "../Context/UserContext";

const SignIn = ({ navigation }) => {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [error, setIsError] = useState({
    email: false,
    emailMsg: "",
    password: false,
    passwordMsg: "",
  });
  const [success, setIsSuccess] = useState({
    email: false,
    password: false,
  });
  const [user, setUser] = useContext(UserStateContext);

  const set_UserToken_Email_Name = async (userToken, userEmail, userName) => {
    try {
      const jsonUserToken = JSON.stringify(userToken);
      await AsyncStorage.setItem("AppUserToken", jsonUserToken);
      await AsyncStorage.setItem("UserEmail", userEmail);
      await AsyncStorage.setItem("UserName", userName);
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonPress = () => {
    if (validateSignInData(signInData)) {
      setUser({
        email: signInData.email,
      });
      fetchRequest("http://192.168.1.205:3000/signIn", signInData)
        .then((res) => res.json())
        .then((res) => {
          if (res.msg == "Successfully loged In") {
            set_UserToken_Email_Name(res.accessToken, res.email, res.userName);
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
  const handleForgotPress = () => {
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
        passwordMsg: "Password must be at least 6 characters long",
      }));
      setIsSuccess((prevState) => ({
        ...prevState,
        password: false,
      }));
      return false;
    } else if (!stringContainsNumberSymbols(password)) {
      setIsError((prevState) => ({
        ...prevState,
        password: true,
        passwordMsg: "Password must contain at least one number and symbol",
      }));
      setIsSuccess((prevState) => ({
        ...prevState,
        password: false,
      }));
      return false;
    } else {
      setIsSuccess((prevState) => ({
        ...prevState,
        password: true,
        passwordMsg: "",
      }));
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
        emailMsg: "",
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
        <Text style={styles.title}>Sign In.</Text>
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
              errorMessage={error[`${el.name}Msg`]}
            />
          );
        })}
        <CustomButton
          btnName={"Sign In"}
          dark={true}
          handleButtonPress={handleButtonPress}
        />
        <TouchableOpacity onPress={handleForgotPress}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
