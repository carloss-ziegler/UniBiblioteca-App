import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import CustomDrawer from "../components/DrawerContent";
import AuthContext from "../contexts/Auth/auth";

const DrawerNavigation = () => {
  const { darkMode } = React.useContext(AuthContext);
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: darkMode ? "#252525" : "#e5e5e5" },
        drawerType: "slide",
        swipeEdgeWidth: 60,
        overlayColor: "transparent",
        sceneContainerStyle: {
          backgroundColor: darkMode ? "#252525" : "#e5e5e5",
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="MainDrawer" component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
