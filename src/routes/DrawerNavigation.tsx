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
        drawerStyle: { backgroundColor: "#1A80D9" },
        drawerType: "slide",
        swipeEdgeWidth: 180,
        overlayColor: "transparent",
        sceneContainerStyle: {
          backgroundColor: "#1A80D9",
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="MainDrawer" component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
