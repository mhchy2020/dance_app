import { Tabs } from "expo-router";
import Ionicons from "@react-native-vector-icons/ionicons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "@/constants/color";
import MyTabBar from "@/components/tabBar";

export default function TabLayout() {
  return (
    // <Tabs
    //   screenOptions={{
    //     headerShown: false,
    //     tabBarActiveTintColor: "#8253e0",
    //     animation: "fade",
    //   }}
    //   tabBar={(props) => <MyTabBar {...props} />}
    // >
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: "Home",
    //       // tabBarStyle: { position: "absolute" },

    //       // tabBarIcon: ({ color, focused }) => (
    //       //   <Ionicons
    //       //     name={focused ? "home-sharp" : "home-outline"}
    //       //     color={color}
    //       //     size={24}
    //       //   />
    //       // ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="profile"
    //     options={{
    //       title: "Profile",
    //       // tabBarIcon: ({ focused, color }) => (
    //       //   <Ionicons
    //       //     name={focused ? "person" : "person-outline"}
    //       //     color={color}
    //       //     size={24}
    //       //   />
    //       // ),
    //     }}
    //   />
    // </Tabs>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#8253e0",
        animation: "fade",
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
