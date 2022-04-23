import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import styles from "../Styles/SignUpStyles";
import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";

import { stringContainsNumberSymbols, fetchRequest } from "../../utils/utils";

const SignUp = ({ navigation }) => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setIsError] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [success, setIsSuccess] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleSignInPress = () => {
    navigation.navigate("SignIn");
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
    setSignUpData({
      ...signUpData,
      [name]: txt,
    });
  };

  const validateName = (name) => {
    if (name.length < 3 || stringContainsNumberSymbols(name)) {
      setIsError((prevState) => ({
        ...prevState,
        name: true,
      }));
      setIsSuccess((prevState) => ({
        ...prevState,
        name: false,
      }));
      // console.log("Name can't be shorter than 3 characters and can't contain number!");
      return false;
    } else {
      setIsSuccess((prevState) => ({
        ...prevState,
        name: true,
      }));
      // console.log("Correct name pattern");
      return true;
    }
  };

  const validatePassword = (password) => {
    if (password.length < 6 || !stringContainsNumberSymbols(password)) {
      setIsError((prevState) => ({
        ...prevState,
        password: true,
      }));
      setIsSuccess((prevState) => ({
        ...prevState,
        password: false,
      }));
      // console.log("Password is too short!");
      return false;
    } else {
      setIsError((prevState) => ({
        ...prevState,
        password: false,
      }));
      setIsSuccess((prevState) => ({
        ...prevState,
        password: true,
      }));
      // console.log("Correct password pattern!");
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
      // console.log("Correct email pattern");
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
      // console.log("Incorrect email");
      return false;
    }
  };

  const validateSignUpData = (signUpData) => {
    if (
      validateName(signUpData.name) &&
      validateEmail(signUpData.email) &&
      validatePassword(signUpData.password)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleButtonPress = () => {
    if (validateSignUpData(signUpData)) {
      fetchRequest("http://192.168.0.104:3000/findOne", signUpData)
        .then((res) => res.json())
        .then((res) => {
          if (res.msg) {
            fetchRequest("http://192.168.0.104:3000/signUp", signUpData)
              .then((res) => {
                res.text();
              })
              .then((res) => {
                return res;
              });
            navigation.navigate("Result", {
              result: "success",
              msg: "You're successfully registered in APP.",
              btnName: "Log In",
              nav: "SignIn",
            });
          } else {
            navigation.navigate("Result", {
              result: "error",
              msg: "User is already registered!",
              btnName: "Sign Up",
              nav: "SignUp",
            });
          }
        });
    } else {
      navigation.navigate("SignUp");
    }
  };
  const inputs = [
    {
      placeholder: "Name",
      name: "name",
      iconName: "user",
    },
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
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-120}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Create Your Account!</Text>
        {inputs.map((el, idx) => {
          return (
            <CustomInput
              key={idx}
              placeholder={el.placeholder}
              name={el.name}
              handleChangeText={handleChangeText}
              iconName={el.iconName}
              isError={error[`${el.name}`]}
              isSuccess={success[`${el.name}`]}
              isSecured={el.isSecured}
            />
          );
        })}
        <CustomButton
          btnName={"Sign Up"}
          dark={true}
          handleButtonPress={() => handleButtonPress()}
        />
        <View style={styles.textContainer}>
          <Text style={styles.info}>Already have an account?</Text>
          <TouchableOpacity onPress={handleSignInPress}>
            <Text style={styles.signIn}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
