import PropTypes from "prop-types";
import { createStackNavigator } from "@react-navigation/stack";
import {
  RegistrationScreen,
  LoginScreen,
  Home,
  CameraScreen,
} from "../Screens";

const AuthStack = createStackNavigator();

export const AuthRoute = ({ stateChange }) => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      {!stateChange && (
        <>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={RegistrationScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="CameraScreen"
            component={CameraScreen}
          />
        </>
      )}
      {stateChange && (
        <>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="CameraScreen"
            component={CameraScreen}
          />
        </>
      )}
    </AuthStack.Navigator>
  );
};

AuthRoute.propTypes = {
  stateChange: PropTypes.bool.isRequired,
};
