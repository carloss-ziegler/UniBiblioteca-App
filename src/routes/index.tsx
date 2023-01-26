import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import AuthContext from "../contexts/Auth/auth";

const Routes: React.FC = () => {
  const { signed, componentLoading } = useContext(AuthContext);

  if (componentLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#1687a7" />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
