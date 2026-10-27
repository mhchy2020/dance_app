import Slider from "@/components/Slider";
import { data } from "@/data/sliderImages";
import { COLORS } from "@/constants/color";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";
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

export default function Index() {
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleClearSearch = () => setSearchQuery("");

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
            {/* <Text style={styles.headerTwo}>NEXT MOVE.</Text> */}
          </View>

          <Text style={styles.headerThree}>
            Discover events, classes, dancers.
          </Text>
        </View>
        <View style={styles.searchBar}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="search"
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

      <View style={{}}>
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
          // color: "rgba(0, 0, 0, 0.65)",
        }}
      >
        EVENT HIGHLIGHTS
      </Text>
      <Slider data={data} />
      <Text
        style={{
          fontSize: 20,
          fontFamily: "gantariBold",
          // color: "rgba(0, 0, 0, 0.65)",
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
    // boxShadow: "1px 3px 3px rgba(0, 0, 0, 0.13)",
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
    // backgroundColor: "#fff",
    backgroundColor: "#dcdcdc",
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
  upComingContainer: {
    padding: 10,
    backgroundColor: "#e3e3e3",
    borderRadius: 10,
    boxShadow: "2px 2px 4px #b86de3",
  },
});
