import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Onboarding from "../screens/Onboarding";
import Authentication from "../screens/Authentication";
import Splash from "../screens/Splash";

const AuthStack = createSharedElementStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Splash" component={Splash} />
      <AuthStack.Screen name="Onboarding" component={Onboarding} />
      <AuthStack.Screen name="Authentication" component={Authentication} />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
