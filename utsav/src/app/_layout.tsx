import { Stack } from "expo-router";
import { useFonts } from "expo-font";
// import { useFonts, Gantari_400Regular } from "@expo-google-fonts/gantari";
import { StatusBar } from "expo-status-bar";
import AuthProvider from "@/context/authContext";
import Loader from "@/components/Loader";

export default function RootLayout() {
  const [loaded] = useFonts({
    gantariThin: require("../assets/fonts/Gantari-Thin.ttf"),
    gantariRegular: require("../assets/fonts/Gantari-Regular.ttf"),
    gantariSemiBold: require("../assets/fonts/Gantari-SemiBold.ttf"),
    gantariBold: require("../assets/fonts/Gantari-Bold.ttf"),
  });
  if (!loaded) {
    return <Loader />;
  }
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" />
    </AuthProvider>
  );
}
