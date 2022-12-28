import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen, CreatePostScreen, ProfileScreen } from "./main";

import PostsIcon from "../assets/icons/toolbar/grid.svg";
import UserIcon from "../assets/icons/toolbar/user.svg";
import PlusIcon from "../assets/icons/toolbar/union.svg";

const MainTab = createBottomTabNavigator();

export const Home = () => {
  const [isCreateScreen, setIsCreateScreen] = useState(true);

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          paddingHorizontal: 85,
          paddingTop: 10,
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <PostsIcon size={size} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
        listeners={() => ({
          tabPress: () => {
            setIsCreateScreen(true);
          },
        })}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return isCreateScreen ? (
              <PlusIcon size={size} stroke={"#FFFFFF"} />
            ) : (
              <UserIcon size={size} stroke={"#FFFFFF"} />
            );
          },
          tabBarItemStyle: {
            maxWidth: 70,
            backgroundColor: "#FF6C00",
            borderRadius: 20,
          },
        }}
        name={isCreateScreen ? "Create" : "Profile"}
        component={isCreateScreen ? CreatePostScreen : ProfileScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return isCreateScreen ? (
              <UserIcon size={size} stroke={"#000"} />
            ) : (
              <PlusIcon size={size} stroke={"#000"} />
            );
          },
        }}
        name={isCreateScreen ? "Profile" : "Create"}
        component={isCreateScreen ? ProfileScreen : CreatePostScreen}
        listeners={() => ({
          tabPress: () => {
            setIsCreateScreen(!isCreateScreen);
          },
        })}
      />
    </MainTab.Navigator>
  );
};
