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
    confirmedPassword: "",
  });
  const [error, setIsError] = useState({
    name: false,
    nameMsg: "",
    email: false,
    emailMsg: "",
    password: false,
    passwordMsg: "",
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
    if (name.length < 3) {
      setIsError((prevState) => ({
        ...prevState,
        name: true,
        nameMsg: "Name must be at least 3 characters",
      }));
      setIsSuccess((prevState) => ({
        ...prevState,
        name: false,
      }));
      return false;
    } else if (stringContainsNumberSymbols(name)) {
      setIsError((prevState) => ({
        ...prevState,
        name: true,
        nameMsg: "Name must not contain numbers or symbols",
      }));
      setIsSuccess((prevState) => ({
        ...prevState,
        name: false,
      }));
      return false;
    } else {
      setIsSuccess((prevState) => ({
        ...prevState,
        name: true,
        nameMsg: "",
      }));
      return true;
    }
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
    } else if (stringContainsNumberSymbols(password)) {
      setIsError((prevState) => ({
        ...prevState,
        password: false,
      }));
      setIsSuccess((prevState) => ({
        ...prevState,
        password: true,
      }));
      return true;
    }
  };
  const validateEquality = (password, confirmPassword) => {
    if (password === confirmPassword) {
      setIsSuccess((prevState) => ({
        ...prevState,
        password: true,
      }));
      return true;
    } else {
      setIsError((prevState) => ({
        ...prevState,
        password: true,
        passwordMsg: "Passwords do not match",
      }));
      setIsSuccess((prevState) => ({
        ...prevState,
        password: false,
      }));
      return false;
    }
  };
  const validateEmail = (email) => {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (email.length < 1) {
      setIsError((prevState) => ({
        ...prevState,
        email: true,
        emailMsg: "Email must not be empty",
      }));
      setIsSuccess((prevState) => ({
        ...prevState,
        email: false,
      }));
      return false;
    }
    if (regex.test(email)) {
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
        emailMsg: "Please enter a valid email address",
      }));
      return false;
    }
  };
  const validateSignUpData = (signUpData) => {
    if (
      validateName(signUpData.name) &&
      validateEmail(signUpData.email) &&
      validatePassword(signUpData.password) &&
      validateEquality(signUpData.password, signUpData.confirmedPassword)
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
              btnName: "Log In",
              nav: "SignIn",
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
    {
      placeholder: "Verify Password",
      name: "confirmedPassword",
      iconName: "lock",
      isSecured: true,
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-30}
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
              errorMessage={error[`${el.name}Msg`]}
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
