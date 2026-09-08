import { Redirect, Stack } from "expo-router";

export default function Auth() {
  const isLoggedIn: boolean = false;
  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
