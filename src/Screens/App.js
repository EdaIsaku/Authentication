import { View, Text } from "react-native";

import styles from "../Styles/ResultStyles";

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.title}>Welome Screen</Text>
      </View>
    </View>
  );
};

export default App;
