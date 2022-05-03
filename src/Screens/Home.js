import { View, Text, ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../Styles/HomeStyles";
import CustomButton from "../Components/CustomButton";
const imgUrl = require("../../assets/backgroundImage.jpg");

const buttons = [
  {
    btnName: "Sign In",
    isDark: false,
  },
  {
    btnName: "Sign Up",
    isDark: true,
  },
];

const Home = ({ navigation }) => {
  const [loaded] = useFonts({
    RobotoRegular: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoBlack: require("../../assets/fonts/Roboto-Black.ttf"),
    RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
    RobotoItalic: require("../../assets/fonts/Roboto-Italic.ttf"),
    RobotoLight: require("../../assets/fonts/Roboto-Light.ttf"),
    RobotoLightItalic: require("../../assets/fonts/Roboto-LightItalic.ttf"),
    RobotoThin: require("../../assets/fonts/Roboto-Thin.ttf"),
  });
  const [userToken, setUserToken] = useState(null);

  //get user token if exists
  const getUserToken = async () => {
    try {
      const jsonUserToken = await AsyncStorage.getItem("AppUserToken");
      setUserToken(jsonUserToken);
    } catch (error) {
      console.log(error);
      return;
    }
  };
  //check if user token exists
  useEffect(() => {
    getUserToken();
  }, []);
  //if user token exists navigate to home screen
  useEffect(() => {
    if (userToken) {
      navigation.navigate("Map");
    } else {
      navigation.navigate("Home");
    }
  }, [userToken]);
  //wait until fonts are loaded
  if (!loaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={imgUrl} resizeMode="cover">
        <View style={styles.opacityContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Welcome to your future!</Text>
            </View>
            <View style={styles.buttonsContainer}>
              {buttons.map((el, idx) => {
                return (
                  <CustomButton
                    key={idx}
                    btnName={el.btnName}
                    dark={el.isDark}
                    handleButtonPress={() =>
                      navigation.navigate(el.btnName.replace(" ", ""))
                    }
                  />
                );
              })}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;
