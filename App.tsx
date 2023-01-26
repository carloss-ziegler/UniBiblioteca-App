import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { AuthProvider } from "./src/contexts/Auth/auth";
import Routes from "./src/routes";

const App: React.FC = () => {
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
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
      <StatusBar style="dark" backgroundColor="#f6f5f5" />
    </>
  );
};

export default App;
