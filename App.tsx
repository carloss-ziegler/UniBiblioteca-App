import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Onboarding from "./src/screens/Onboarding";
import Splash from "./src/screens/Splash";
import Authentication from "./src/screens/Authentication";
import Home from "./src/screens/Home";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import Favorites from "./src/screens/Favorites";
import BookDetail from "./src/screens/BookDetail";
import Settings from "./src/screens/Settings";
import PrivacyPolicy from "./src/screens/PrivacyPolicy";
import TermsAndConditions from "./src/screens/TermsAndConditions";

const Stack = createSharedElementStackNavigator();

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
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Favorites" component={Favorites} />
          <Stack.Screen
            name="BookDetail"
            component={BookDetail}
            options={{ presentation: "transparentModal" }}
          />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" backgroundColor="#f6f5f5" />
    </>
  );
}
