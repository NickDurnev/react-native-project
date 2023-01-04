import PropTypes from "prop-types";
import { createStackNavigator } from "@react-navigation/stack";
import {
  RegistrationScreen,
  LoginScreen,
  Home,
  CameraScreen,
} from "../Screens";

const AuthStack = createStackNavigator();

export const AuthRoute = ({ user }) => {
  console.log(user);
  return (
    <AuthStack.Navigator initialRouteName="Login">
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
      {user && (
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
  user: PropTypes.object,
};
