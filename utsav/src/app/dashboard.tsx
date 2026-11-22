import { COLORS } from "@/constants/color";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <Pressable onPress={() => router.back()} style={{ paddingVertical: 10 }}>
        <Ionicons name="arrow-back-outline" color={COLORS.primary} size={30} />
      </Pressable>
      <View>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Ionicons
            name="shield-checkmark-outline"
            color={COLORS.primary}
            size={15}
          />
          <Text style={styles.headerSecondary}>ADMIN/OVERVIEW</Text>
        </View>
        <Text style={styles.header}>BEHIND THE BEAT.</Text>
        <Text style={styles.headerThree}>
          Your events. Your community. All in rythm.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => router.push("/newEvent")}
          style={styles.eventButton}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="calendar-outline" color={"#fff"} size={24} />
            <Ionicons name="add" color={"#fff"} size={24} />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={styles.addEventText}>Add new event</Text>
            <Text style={styles.addEventTextTwo}>Plan the next night</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => router.push("/eventHighlights")}
          style={[styles.eventButton, { backgroundColor: "#F0E9FC" }]}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="image-outline" color={COLORS.primary} size={24} />
            <Ionicons name="add" color={COLORS.primary} size={24} />
          </View>
          <View style={{ gap: 5 }}>
            <Text
              style={[
                styles.addEventText,
                {
                  color: "#111827",
                },
              ]}
            >
              Add new highlight
            </Text>
            <Text
              style={[
                styles.addEventTextTwo,
                {
                  color: "#6b7280",
                },
              ]}
            >
              Share the last one
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 30,
  },
  header: {
    color: "#111827",
    fontFamily: "gantariExtraBold",
    fontSize: 46,
    letterSpacing: 1,
    lineHeight: 45,
  },
  headerSecondary: {
    color: COLORS.textPrimary,
    fontFamily: "gantariRegular",
    fontSize: 10,
    letterSpacing: 1,
  },
  headerThree: {
    fontFamily: "gantariRegular",
    fontSize: 13,
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  eventButton: {
    flex: 1,
    gap: 10,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    padding: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addEventText: {
    color: "#fff",
    fontFamily: "gantariBold",
    fontSize: 30,
    // letterSpacing: 0.5,
    lineHeight: 35,
  },
  addEventTextTwo: {
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: "gantariRegular",
    fontSize: 15,
  },
});
