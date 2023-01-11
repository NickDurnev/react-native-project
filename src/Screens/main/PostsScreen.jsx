import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreen, CommentsScreen, MapScreen } from "../nested";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedScreen.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="DefaultScreen"
    >
      <NestedScreen.Screen name="DefaultScreen" component={DefaultScreen} />
      <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen} />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};
