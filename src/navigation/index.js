import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import NewDetailScreen from "../screens/NewDetailScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SavedScreen from "../screens/SavedScreen";
import SearchScreen from "../screens/SearchScreen";
import InitScreen from "../screens/InitScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { useColorScheme } from "nativewind";
import { Ionicons, Fontisto } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppNavigation = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Discover") {
              return (
                <Fontisto
                  name="world-o"
                  size={25}
                  color={focused ? "#fff" : "#868e96"}
                />
              );
            } else if (route.name === "Saved") {
              iconName = "bookmark-outline";
            } else if (route.name === "Profile") {
              iconName = "person-circle-outline";
            }
            return (
              <Ionicons
                name={iconName}
                size={22}
                color={focused ? "#fff" : "#868e96"}
              />
            );
          },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#868e96",
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarStyle: {
            backgroundColor: colorScheme == "dark" ? "black" : "#f8f9fa",
            display: "flex",
            alignItems: "center",
            marginHorizontal: 16,
            paddingTop: 10,
          },
          tabBarActiveBackgroundColor: "#339af0",
          tabBarLabel: navigation.isFocused() ? route.name : "",
          tabBarLabelPosition: "beside-icon",
          tabBarItemStyle: {
            borderRadius: 20,
            paddingHorizontal: 6,
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="Discover"
          component={DiscoverScreen}
          options={{
            tabBarStyle: {
              display: "none",
            },
          }}
        />
        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Init">
        <Stack.Screen name="Init" component={InitScreen} />
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="NewDetails" component={NewDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
