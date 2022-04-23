import { View, Text, ImageBackground } from "react-native";
import styles from "../Styles/HomeStyles";

import CustomButton from "../Components/CustomButton";

const imgUrl = require("../../assets/backgroundImage.jpg");
import { useFonts } from "expo-font";

const Home = ({ navigation }) => {
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
  const [loaded] = useFonts({
    RobotoRegular: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoBlack: require("../../assets/fonts/Roboto-Black.ttf"),
    RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
    RobotoItalic: require("../../assets/fonts/Roboto-Italic.ttf"),
    RobotoLight: require("../../assets/fonts/Roboto-Light.ttf"),
  });
  if (!loaded) {
    return null;
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
