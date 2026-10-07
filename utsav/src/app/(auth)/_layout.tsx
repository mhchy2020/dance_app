import Loader from "@/components/Loader";
import { useAuth } from "@/context/authContext";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Auth() {
  const { isLoggedIn, isLoading } = useAuth();
  // return <Loader message={"Session Expired \nPlease log in again..."} />;
  if (isLoading) {
    return <Loader />;
  }
  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
