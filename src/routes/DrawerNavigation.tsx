import React from "react";
import { Platform, StyleSheet, Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import CustomDrawer from "../components/DrawerContent";
import AuthContext from "../contexts/Auth/auth";

const { width } = Dimensions.get("screen");

const DrawerNavigation = () => {
  const { darkMode } = React.useContext(AuthContext);
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: darkMode ? "#276678" : "#1687a7" },
        drawerType: "slide",
        swipeEdgeWidth: 180,
        overlayColor: "transparent",
        sceneContainerStyle: {
          backgroundColor: darkMode ? "#276678" : "#1687a7",
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="MainDrawer" component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
