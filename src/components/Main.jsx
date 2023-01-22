import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

import { AuthRoute } from "../components";
import { authStateUserChange } from "../redux/auth/authOperations";

export const Main = ({ onLayoutRootView }) => {
  const { stateChange, firstEnter } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateUserChange());
  }, []);

  return (
    <NavigationContainer>
      <View style={styles.container} onLayout={onLayoutRootView}>
        {stateChange !== null && (
          <AuthRoute stateChange={stateChange} firstEnter={firstEnter} />
        )}
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
