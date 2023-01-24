import React from "react";
import { Platform, StyleSheet, Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import CustomDrawer from "../components/DrawerContent";

const { width } = Dimensions.get("screen");

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: styles.drawerStyles,
        drawerType: "slide",
        swipeEdgeWidth: Platform.OS === "android" && 180,
        overlayColor: "transparent",
        sceneContainerStyle: styles.sceneStyles,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="MainDrawer" component={Home} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  sceneStyles: {
    backgroundColor: "#1687a7",
  },
  drawerStyles: {
    paddingTop: 48,
    backgroundColor: "#1687a7",
    width: width * 0.5,
  },
});

export default DrawerNavigation;
