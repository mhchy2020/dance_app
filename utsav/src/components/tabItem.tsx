import { COLORS } from "@/constants/color";
import Ionicons from "@react-native-vector-icons/ionicons";
import { StyleSheet, Text, View } from "react-native";

type props = {
  label: string;
  isFocused: boolean;
};

function getIconName(isFocused: boolean, title: string) {
  switch (title) {
    case "Home":
      return isFocused ? "home" : "home-outline";
    case "Profile":
      return isFocused ? "person" : "person-outline";
    default:
      return "home-outline";
  }
}

export default function TabItem({ label, isFocused }: props) {
  return (
    <View style={styles.iconContainer}>
      <Ionicons
        name={getIconName(isFocused, label)}
        size={24}
        color={COLORS.primary}
      />
      {isFocused && <Text style={styles.itemText}>{label}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  itemText: {
    fontFamily: "gantariRegular",
    fontSize: 15,
    color: COLORS.primary,
  },
});
