import { COLORS } from "@/constants/color";
import { images } from "@/data/sliderImages";
import Ionicons from "@react-native-vector-icons/ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { height, width } = Dimensions.get("screen");
export default function upcomingEvent() {
  const insets = useSafeAreaInsets();

  const [readStatus, setReadStatus] = useState<boolean>(false);
  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={images["stepDance"]} style={styles.image} />
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.73)"]}
            style={styles.background}
          >
            <Text style={styles.title}>STEP DANCE</Text>
          </LinearGradient>
          <Pressable
            style={styles.arrowContainer}
            onPress={() => router.back()}
          >
            <Ionicons style={styles.arrow} name="arrow-back" />
          </Pressable>
        </View>
        <View style={{ paddingHorizontal: 20, marginVertical: 10, gap: 10 }}>
          <View style={styles.details}>
            <View style={styles.icon}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>

            <View>
              <Text style={styles.dayDate}>Saturday, 7 November</Text>
              <Text style={styles.time}>8.00 - 9.00 am</Text>
            </View>
          </View>
          <View style={styles.details}>
            <View style={styles.icon}>
              <Ionicons
                name="location-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>
            <View>
              <Text style={styles.dayDate}>Qudos Arena</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  width: 0.6 * width,
                }}
              >
                <Text
                  style={styles.time}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  19 Edwin Flack Ave, Sydney Olympic Park NSW 2127
                </Text>
                <Ionicons
                  name="arrow-forward-outline"
                  color={COLORS.primary}
                  size={20}
                  style={{ transform: [{ rotate: "315deg" }] }}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginVertical: 10, gap: 10 }}>
          <Text style={{ fontFamily: "gantariBold", fontSize: 24 }}>
            THE EVENT
          </Text>
          <View>
            <Text
              style={{ fontFamily: "gantariRegular" }}
              numberOfLines={readStatus ? undefined : 4}
              ellipsizeMode="clip"
            >
              Sydney[a] is the capital of the state of New South Wales and the
              largest city in Australia.[7] The metropolis surrounds Sydney
              Harbour and extends about 80 kilometres (50 mi) from the Pacific
              Ocean in the east to the Blue Mountains in the west, and about 80
              kilometres (50 mi) from Ku-ring-gai Chase National Park and the
              Hawkesbury River in the north and north-west, to the Royal
              National Park and Macarthur in the south and south-west.[8]
              Greater Sydney consists of 658 suburbs, spread across 33 local
              government areas. Residents of the city are colloquially known as
              "Sydneysiders".[9] The estimated population in June 2025 was
              5,638,830,[4] which is about 66% of the state's population.[10]
              The city's nicknames include the Emerald City and the Harbour City
            </Text>
            <Pressable onPress={() => setReadStatus(!readStatus)}>
              <Text style={{ color: COLORS.primary }}>
                {readStatus ? "Read less" : "Read more"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arrowContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 40,
    padding: 10,
    borderRadius: 200,
    backgroundColor: COLORS.primary,
  },
  arrow: {
    fontSize: 20,
    color: "#fff",
  },
  imageContainer: {},
  image: {
    height: 0.4 * height,
    width: "100%",
    resizeMode: "cover",
  },
  background: {
    flexDirection: "row",
    alignItems: "flex-end",
    position: "absolute",
    height: 0.4 * height,
    width: "100%",
    padding: 10,
  },
  title: {
    fontFamily: "gantariBold",
    color: "#fff",
    fontSize: 30,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dayDate: {
    fontSize: 18,
    fontFamily: "gantariRegular",
  },
  time: {
    fontSize: 12,
    fontFamily: "gantariRegular",
    color: COLORS.textSecondary,
  },
  icon: {
    borderRadius: 30,
    backgroundColor: "#dcdcdc",
    padding: 10,
  },
});
