import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/Screens/Home";
import SignIn from "./src/Screens/SignIn";
import SignUp from "./src/Screens/SignUp";
import ResetPassword from "./src/Screens/ResetPassword";
import Result from "./src/Screens/Result";
import Map from "./src/Screens/Map";
import UserState from "./src/Context/UserContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <UserState>
        <Stack.Navigator
          initialRouteName={"Home"}
          // screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="Result" component={Result} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </UserState>
    </NavigationContainer>
  );
}
