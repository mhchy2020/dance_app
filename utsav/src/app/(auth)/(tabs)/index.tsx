import Slider from "@/components/Slider";
import { data } from "@/data/sliderImages";
import { COLORS } from "@/constants/color";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EventCard from "@/components/eventCard";
import { router } from "expo-router";
import { useAuth } from "@/context/authContext";
import { apiRequest } from "@/api/client";
import { getEventsResponse } from "@/types/apiResponseTypes";

export default function Index() {
  const insets = useSafeAreaInsets();

  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleClearSearch = () => setSearchQuery("");

  const getEvents = async () => {
    const result = await apiRequest<getEventsResponse>("/events", {
      method: "GET",
    });
    const events = result.data;
    console.log(events);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <ScrollView
      style={[styles.container, { marginTop: insets.top }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* <View style={[styles.container, { marginTop: insets.top }]}> */}
      <View style={styles.headerContainer}>
        <View style={{ gap: 10 }}>
          <Text style={styles.header}>UTSAV DANCE ACADEMY</Text>
          <Text style={styles.headerThree}>Less scroll. More scroll</Text>
          <View style={{ width: "70%" }}>
            <Text style={styles.headerTwo}>FIND YOUR NEXT MOVE</Text>
          </View>

          <Text style={styles.headerThree}>
            Discover events, classes, dancers.
          </Text>
        </View>
        <View style={styles.searchBar}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Events, styles & venues"
              placeholderTextColor={COLORS.textPrimary}
              cursorColor={COLORS.primary}
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
            {searchQuery !== "" && (
              <Pressable style={styles.closeIcon} onPress={handleClearSearch}>
                <Ionicons name="close-outline" color={"#fff"} />
              </Pressable>
            )}
          </View>

          <View style={styles.searchIcon}>
            <Ionicons name="search-outline" size={20} color={"#fff"} />
          </View>
        </View>
      </View>

      {user?.role === "admin" && (
        <View style={styles.adminContainer}>
          <Text
            style={{
              fontFamily: "gantariRegular",
              color: COLORS.textPrimary,
              fontSize: 13,
            }}
          >
            ADMIN ACCESS
          </Text>
          <Pressable
            onPress={() => router.push("/dashboard")}
            style={styles.adminButton}
          >
            <View style={{ flexDirection: "row", gap: 15 }}>
              <Ionicons name="shield-half-outline" color="#fff" size={20} />
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "gantariRegular",
                  fontSize: 17,
                }}
              >
                Admin Dashboard
              </Text>
            </View>

            <Ionicons name="arrow-forward-outline" size={20} color={"#fff"} />
          </Pressable>
        </View>
      )}

      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "gantariBold",
              letterSpacing: 0.5,
            }}
          >
            UPCOMING EVENTS
          </Text>
          <Pressable
            style={{ borderBottomWidth: 1, borderColor: COLORS.primary }}
          >
            <Text
              style={{ color: COLORS.primary, fontFamily: "gantariRegular" }}
            >
              View all
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            gap: 10,
            marginVertical: 10,
          }}
        >
          <EventCard
            image={"ballerina"}
            date={"4 APR"}
            title={"Ballerina Dance"}
            description={"description"}
          />
          <EventCard
            image={"flamenco"}
            date={"4 OCT"}
            title={"Flamenco Dance"}
            description={"description"}
          />
        </View>
      </View>

      <Text
        style={{
          fontSize: 24,
          fontFamily: "gantariBold",
          letterSpacing: 0.5,
        }}
      >
        EVENT HIGHLIGHTS
      </Text>
      <Slider data={data} />
      <Text
        style={{
          fontSize: 20,
          fontFamily: "gantariBold",
        }}
      >
        Meet the Community
      </Text>
      {/* </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  contentContainer: {
    gap: 20,
  },
  headerContainer: {
    // backgroundColor: "#d979f17e",
    marginTop: 10,
    gap: 15,
    padding: 10,
    borderRadius: 20,
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  header: {
    // letterSpacing: 1,
    fontFamily: "gantariExtraBold",
    fontSize: 20,
    color: COLORS.primary,
    marginBottom: 10,
    // color: "#fff",
  },
  headerTwo: {
    fontFamily: "gantariExtraBold",
    fontSize: 35,
    lineHeight: 30,
  },
  headerThree: {
    fontFamily: "gantariRegular",
    fontSize: 15,
    color: "#6a6767",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: "gantariRegular",
  },
  closeIcon: {
    padding: 10,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
  },
  searchIcon: {
    padding: 10,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
  },
  adminContainer: {
    gap: 8,
    paddingHorizontal: 10,
  },
  adminButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,

    borderRadius: 10,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  upComingContainer: {
    padding: 10,
    backgroundColor: "#e3e3e3",
    borderRadius: 10,
    boxShadow: "2px 2px 4px #b86de3",
  },
});
