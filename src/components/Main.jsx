import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { AuthRoute } from "../components";
import { authStateUserChange } from "../redux/auth/authOperations";

export const Main = ({ onLayoutRootView }) => {
  const { stateChange } = useSelector((state) => state.auth);

  const AuthStack = createStackNavigator();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateUserChange());
  }, []);

  return (
    <NavigationContainer>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <AuthRoute stateChange={stateChange} />
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
