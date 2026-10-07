import { COLORS } from "@/constants/color";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type props = {
  message?: string;
};

export default function Loader({ message }: props) {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="#b86de3" />
      <Text style={styles.message}>{message}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 22,
    fontFamily: "gantariRegular",
    margin: 20,
  },
});
