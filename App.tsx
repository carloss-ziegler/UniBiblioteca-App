import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import Onboarding from "./src/screens/Onboarding";
import Splash from "./src/screens/Splash";
import Authentication from "./src/screens/Authentication";
import Home from "./src/screens/Home";
import { StatusBar } from "expo-status-bar";
import DrawerContent from "./src/components/DrawerContent";
import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// const CustomDrawer = () => {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => {
//         return <DrawerContent {...props} />;
//       }}
//     >
//       <Drawer.Screen name="Home" component={Home} />
//     </Drawer.Navigator>
//   );
// };

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Semibold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Splash"
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Authentication" component={Authentication} />
          <Stack.Screen name="HomeDrawer" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" />
    </>
  );
}
