import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Home from "../screens/Home";
import Favorites from "../screens/Favorites";
import BookDetail from "../screens/BookDetail";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import Search from "../screens/Search";
import Settings from "../screens/Settings";
import TermsAndConditions from "../screens/TermsAndConditions";
import DrawerNavigation from "./DrawerNavigation";
import Splash from "../screens/Splash";

const AppStack = createSharedElementStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Splash" component={Splash} />
      <AppStack.Screen name="Home" component={DrawerNavigation} />
      <AppStack.Screen name="Favorites" component={Favorites} />
      <AppStack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{ presentation: "transparentModal" }}
      />
      <AppStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <AppStack.Screen name="Search" component={Search} />
      <AppStack.Screen name="Settings" component={Settings} />
      <AppStack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
      />
    </AppStack.Navigator>
  );
};

export default AppRoutes;
