import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import CustomButton from "../Components/CustomButton";

import styles from "../Styles/ResultStyles";

const Result = ({ navigation, route }) => {
  const handleButtonPress = () => {
    navigation.navigate(route.params.nav);
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          route.params.result == "success"
            ? styles.successIconContainer
            : styles.errorIconContainer,
        ]}
      >
        <Icon
          style={[
            styles.icon,
            route.params.result == "success"
              ? styles.successIcon
              : styles.errorIcon,
          ]}
          name={route.params.result === "success" ? "check" : "times"}
        />
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.title}>
          {route.params.result === "success" ? "Congratulation!" : "Oooops!"}
        </Text>
        <Text style={styles.subtitle}>{route.params.msg}</Text>
      </View>
      <CustomButton
        btnName={route.params.btnName}
        handleButtonPress={handleButtonPress}
        success={route.params.result == "success" ? true : false}
        error={route.params.result == "error" ? true : false}
      />
    </View>
  );
};

export default Result;
